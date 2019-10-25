import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NihDiApiService } from '../nih-di-api.service';
import { NihRxnormApiService } from '../nih-rxnorm-api.service';

@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();
  nihRxnormResponses: {}[] = [];

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
  onSubmit(): void {

    // Clear previous results.
    this.nihRxnormResponses = [];

    // Fetch observables from the NIH RxNorm API, which is used to retrieve RxCUI 
    // numbers, for each user-submitted medication and then subscribe to each
    // observable.
    const medObservables: {med, observable}[] = this.nihRxnormApiService.fetchNihRxnormApi(this.medGroup.value.meds);
    medObservables.forEach(medObservable => {

      // Subscribe to the medObservable.observable observable (ha).
      const medObservableSubscription = medObservable.observable.subscribe({
        next: res => nextNihResponse(res),
        error: err => console.log('NIH RxNorm API - Error:', err),
        complete: console.log('NIH RxNorm API - Complete.')
      });

      // Store the results of the "next" response in the nihRxnormResponses[]
      // array, and then unsubscribe from the medObservableSubscription.
      const nextNihResponse = (res) => {
        this.nihRxnormResponses.push({
          'med': medObservable.med, 
          'rxcui': (() => { return res.idGroup.rxnormId ? res.idGroup.rxnormId[0] : 'No valid RxCUI number found.' })() 
        });
        medObservableSubscription.unsubscribe()
      }
    });

    // Show nihRxnormResponses
    setTimeout(() => {
      this.shownihRxnormResponses();
    }, 1000);

    // Fetch drug interactions from the NIH Drug Interaction API using the RxCUI
    // numbers retrieved from the NIH RxNorm API.
    // TODO
  }

  // Show nihRxnormResponses
  shownihRxnormResponses() {
    console.log(this.nihRxnormResponses);
  }

}
