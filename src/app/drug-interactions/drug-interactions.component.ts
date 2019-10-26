import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NihDiApiService } from '../nih-di-api.service';
import { NihRxnormApiService } from '../nih-rxnorm-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();
  rxNormResponses: string[] = [];

  // Define the form model. Users can change this model by adding or removing 
  // fields from the form.
  medFormFields = { 
    meds: this.formBuilder.array([ 
      this.formBuilder.control(''),
      this.formBuilder.control('')
    ])
  }
  get meds() {
    return this.medGroup.get('meds') as FormArray;
  }

  // Declare an Angular Form Group.
  medGroup: FormGroup = this.formBuilder.group(this.medFormFields);

  constructor (
    private formBuilder: FormBuilder, 
    private nihDiApiService: NihDiApiService,
    private nihRxnormApiService: NihRxnormApiService,
  ) { }

  ngOnInit() {
    this.emitPageTitle();
  }

  // Add a medication input field.
  medFormAddField(): void {
    this.meds.push(this.formBuilder.control(''));
  }

  // Delete a medication input field.
  medFormDeleteField(medIndex: number): void {
    this.meds.removeAt(medIndex)
  }

  // Since the title/header for each view in this website is embedded in the 
  // parent side-nav component, we are emitting each child view's title via 
  // child --> parent data flow.
  emitPageTitle(): void {
    this.pageTitle.emit('Drug Interactions');
  }

  // Get NIH drug interaction API results.
  onSubmit() {

    // Clear previous results.
    this.rxNormResponses = [];

    // Send user-submitted medications to the NIH RxNorm API using the 
    // nihRxnormAPIService service, which returns an array of observables that 
    // can receive RxCUI numbers.
    const rxNormObservables: Observable<object>[] = this.nihRxnormApiService.fetchRxNormApi(this.medGroup.value.meds);
    rxNormObservables.forEach(rxNorm$ => {

      // Subscribe to each rxNorm$ observable in order to retrieve RxCUI numbers.
      const rxNorm$Subscription = rxNorm$.subscribe({
        next: (res: {idGroup: {rxnormId}}) => nextRxNormResponse(res),
        error: err => console.log('NIH RxNorm API - Error:', err),
        complete: () => console.log('NIH RxNorm API - Complete.')
      });

      // Store the RxCUI numbers from the "next" response in the rxNormResponses[]
      // array, and then unsubscribe from the rxNorm$Subscription. 
      const nextRxNormResponse = (res: {idGroup: {rxnormId}}) => {
        this.rxNormResponses.push(
          (() => { return res.idGroup.rxnormId ? res.idGroup.rxnormId[0] : 'No valid RxCUI number found.' })() 
        );
        rxNorm$Subscription.unsubscribe()

        // If all responses/RxCUI numbers for user-submitted medications have been 
        // received from the NIH RxNorm API, then send an array of RxCUI numbers 
        // to the NIH Drug Interactions API using the nihDiApiService service, 
        // which returns a single observable. 
        if (rxNormObservables.length === this.rxNormResponses.length) {
          console.log('NIH RxNorm API - Success: RxCUI numbers for all submitted medication requests have been received:', this.rxNormResponses);
          const di$: Observable<object> = this.nihDiApiService.fetchDiApi(this.rxNormResponses);
          const di$Subscription = di$.subscribe({
            next: res => console.log('NIH Drug Interactions API - Next:', res),
            error: err => console.log('NIH Drug Interactions API - Error:', err),
            complete: () => console.log('NIH Drug Interactions API - Complete.')
          });

        // Awaiting responses/RxCUI numbers from the NIH RxNorm API for all 
        // user-submitted medications.
        } else {
          console.log('NIH RxNorm API - Pending: Awaiting responses for all submitted medication requests.')
        }
      }
    });
  }
}
