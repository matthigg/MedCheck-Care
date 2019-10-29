import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NihApproximateMatchApiService } from '../nih-approximate-match-api.service';
import { NihDiApiService } from '../nih-di-api.service';
import { NihRxcuiApiService } from '../nih-rxcui-api.service';
import { Observable, Observer, Subscriber, Subscription } from 'rxjs';

import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {

  // ---------- Class Variable Declarations ------------------------------------

  @Output() pageTitle = new EventEmitter<string>();
  diDisclaimer: string;
  diError: string;
  diInteractions: Set<string> = new Set();
  diMedications: {} = {};
  diUserInput: Set<string> = new Set();
  rxCUIResponses: string[] = [];
  private _fcSubscriptions = new Subscription(); 
  private _rxCUISubscriptions = new Subscription();
  private _diSubscriptions = new Subscription();
  
  // This variable determines what to display in the template under "Step 3":
  //
  // 'idle'       - no medications have been submitted to the NIH RxCUI API
  // 'pending'    - a request has been made to the NIH RxCUI API and we are now
  //                awaiting a final response from the NIH Drug Interactions API
  // 'noResults'  - means either A) no drug interactions were found, or B) the 
  //                request timed out
  // 'received'   - a response from the NIH Drug Interactions API has been received 
  //                and the results can be displayed under "Step 3"
  // 'error'      - there was an error with either the NIH RxCUI or Drug 
  //                Interactions API
  step3ResultsStatus: string = 'idle';

  // Define the form model. Users can change this model by adding or removing 
  // fields from the form.
  medFormFields = {
    meds: this.formBuilder.array([ 
      this.formBuilder.control(''),
      this.formBuilder.control('')
    ])
  }
  get meds(): FormArray {
    return this.medGroup.get('meds') as FormArray;
  }

  // Declare an Angular Form Group.
  medGroup: FormGroup = this.formBuilder.group(this.medFormFields);

  // ---------- Constructor & Lifecycle Hooks ----------------------------------

  constructor (
    private formBuilder: FormBuilder, 
    private nihApproximateMatchApiService: NihApproximateMatchApiService,
    private nihDiApiService: NihDiApiService,
    private nihRxcuiApiService: NihRxcuiApiService,
  ) { }

  ngOnInit() {
    this.emitPageTitle();
    this.meds.controls.forEach(control => {
      this.fcSubscribe(control.valueChanges);
    })
  }

  ngOnDestroy() {
    this._fcSubscriptions.unsubscribe();
    this._rxCUISubscriptions.unsubscribe();
    this._diSubscriptions.unsubscribe();
  }

  // ---------- Class Methods --------------------------------------------------

  // Since the title/header for each view in this website is embedded in the 
  // parent side-nav component, we are emitting each child view's title via 
  // child --> parent data flow.
  emitPageTitle(): void {
    this.pageTitle.emit('Drug Interactions');
  }

  // Add a medication input field.
  medFormAddFormControl(): void {
    const newFc = this.formBuilder.control('');
    this.fcSubscribe(newFc.valueChanges);
    this.meds.push(newFc);
  }

  // Delete a medication input field.
  medFormDeleteFormControl(index: number): void {
    this.meds.removeAt(index);
  }

  // ---------- NIH APIs -------------------------------------------------------

  // Get NIH Approximate Match API typeahead suggestions.
  fcSubscribe(fc$) {
    const fcDebounced$ = fc$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const fcDebounced$Subscriber = fcDebounced$.subscribe({
      next: res => nextApproxMatchResponse(res),
      error: err => console.log('NIH Approximate Match API - Error:', err),
      complete: () => console.log('NIH Approximate Match API - Complete.'),
    });

    // Keep track of all new Form Control valueChanged subscribers
    this._fcSubscriptions.add(fcDebounced$Subscriber);

    // Make NIH Approximate Match API request.
    const nextApproxMatchResponse = (res) => {
      console.log('NIH Approximate Match API - Response:', res);
    }
  }

  // Get NIH Drug Interaction API results.
  onSubmit() {

    // Clear previous results.
    this.diDisclaimer = '';
    this.diInteractions.clear();
    this.diMedications = {};
    this.diUserInput.clear();
    this.rxCUIResponses = [];

    // Capture user input from the drug interactions form in Step 1. If there is
    // no user input, ie. all fields are empty, then return.
    let userInputIsEmpty = true;
    this.medGroup.value.meds.forEach(med => {
      if (med) { 
        this.diUserInput.add(med); 
        userInputIsEmpty = false;
      }
    })
    if (userInputIsEmpty === true) { 
      this.step3ResultsStatus = 'idle';
      return; 
    }

    // Set status to 'pending' in order to reflect the current status under Step
    // 3 in the template.
    this.step3ResultsStatus = 'pending';

    // ---------- NIH RxCUI API - Get RxCUI Numbers ----------------------------

    // Send user-submitted medications to the NIH RxCUI API using the 
    // nihRxcuiAPIService service, which returns an array of objects containing
    // observables that can receive RxCUI numbers.
    const rxCUIObservables: {med: string, observable: Observable<object>}[] = this.nihRxcuiApiService.fetchRxCUIAPI(this.medGroup.value.meds);
    rxCUIObservables.forEach(rxCUIObservable => {

      // Subscribe to each rxCUI observable in order to retrieve RxCUI numbers.
      const rxCUI$Subscriber = rxCUIObservable.observable.subscribe({
        next: (res: {idGroup: {rxnormId}}) => nextRxCUIResponse(res, rxCUIObservable.med, rxCUI$Subscriber),
        error: err => { 
          console.log('NIH RxCUI API - Error:', err);
          this.diError = err;
          this.step3ResultsStatus = 'error';
        },
        complete: () => console.log('NIH RxCUI API - Complete.'),
      });
      this._rxCUISubscriptions.add(rxCUI$Subscriber)
    });

    // ---------- NIH Drug Interactions API - Get Drug Interactions ------------

    // Store the RxCUI numbers from the "next" response in the rxCUIResponses[]
    // array, unsubscribe from the rxCUISubscriber, and initiate NIH Drug
    // Interactions API request once all responses from the NIH RxCUI API have
    // been received.
    const nextRxCUIResponse = (res: {idGroup: {rxnormId}}, med, rxCUI$Subscriber) => {
      this.rxCUIResponses.push(
        (() => { return res.idGroup.rxnormId ? res.idGroup.rxnormId[0] : `No valid RxCUI number found for '${med}'.` })() 
      );
      rxCUI$Subscriber.unsubscribe()

      // Awaiting responses/RxCUI numbers from the NIH RxCUI API for all 
      // user-submitted medications.
      if (rxCUIObservables.length !== this.rxCUIResponses.length) {
        console.log('NIH RxCUI API - Pending: Awaiting responses for all submitted medication requests.')

      // If all responses/RxCUI numbers for user-submitted medications have been 
      // received from the NIH RxCUI API, then send an array of RxCUI numbers 
      // to the NIH Drug Interactions API using the nihDiApiService service, 
      // which returns a single observable. 
      } else {
        console.log('NIH RxCUI API - Success: RxCUI numbers for all submitted medication requests have been received:', this.rxCUIResponses);
        const di$: Observable<object> = this.nihDiApiService.fetchDiAPI(this.rxCUIResponses);
        const di$Subscriber = di$.subscribe({
          next: res => nextDiResponse(res, di$Subscriber),
          error: err => {
            console.log('NIH Drug Interactions API - Error:', err);
            this.diError = err;
            this.step3ResultsStatus = 'error';
          },
          complete: () => console.log('NIH Drug Interactions API - Complete.'),
        });
        this._diSubscriptions.add(di$Subscriber);
      }
    }

    // ---------- NIH Drug Interactions API - Parse Results --------------------

    // Handle results from NIH Drug Interactions API request.
    interface DiResult {
      interaction: string, 
      comment: string,
      meds: {
        minConceptItem: string, 
        sourceConceptItem: string, 
        url: string,
      }[],
    }
    const nextDiResponse = (res, di$Subscriber) => {
      const diResults: DiResult[] = [];
      if (res.fullInteractionTypeGroup) {
        this.diDisclaimer = res.nlmDisclaimer;
        res
          .fullInteractionTypeGroup.forEach(fitg => {
            fitg.fullInteractionType.forEach(fit => {
              fit.interactionPair.forEach(ip => {
                const diResult: DiResult = {
                  interaction: null,
                  comment: fit.comment,
                  meds: []
                }
                diResult.interaction = ip.description
                ip.interactionConcept.forEach(ic => {
                  diResult.meds.push({
                    minConceptItem: ic.minConceptItem.name,
                    sourceConceptItem: ic.sourceConceptItem.name,
                    url: ic.sourceConceptItem.url,
                  });
                });
                diResults.push(diResult);
              });
            });
          });
        console.log('NIH Drug Interaction API RESULTS:', diResults);
        displayDiResults(diResults);
      } else {
        console.log('NIH Drug Interaction API RESULTS: No interactions to report.');
        this.step3ResultsStatus = 'noResults';
      }
      di$Subscriber.unsubscribe();
    }

    // ---------- NIH Drug Interactions API - Display Results ------------------

    // Update template variables in order to display drug interaction results.
    const displayDiResults = (diResults) => {
      diResults.forEach(result => {
        this.diInteractions.add(result.interaction);
        result.meds.forEach(med => {
          med.minConceptItem = medCapitalize(med.minConceptItem);
          med.sourceConceptItem = medCapitalize(med.sourceConceptItem);
          this.diMedications[med.minConceptItem] = [];
          if (med.minConceptItem !== med.sourceConceptItem) {
            this.diMedications[med.minConceptItem].push(med.sourceConceptItem);
          }
        });
      });

      // Set status to 'received' in order to show the final results under Step 
      // 3 in the template.
      this.step3ResultsStatus = 'received';
    }

    // Capitalize medication names for formatting & easy comparison
    const medCapitalize = (med: string) => {
      return med[0].toUpperCase() + med.slice(1).toLowerCase();
    }
  }
}

// Drug interactions
// object
//   .fullInteractionTypeGroup[0]
//   .fullInteractionType[0]
//   .interactionPair
//   .forEach(obj => console.log(obj.description))

// Drug names and URL
// object
//   .fullInteractionTypeGroup[0]
//   .fullInteractionType[0]
//   .interactionPair
//   .forEach(obj => obj.interactionConcept
//     .forEach(objX => 
//       console.log(
//         minConceptItem.name, 
//         sourceConceptItem.name, 
//         sourceConceptItem.url
//       )
//     )
//   )