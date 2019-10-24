import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NihDiApiService } from '../nih-di-api.service';

@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();
  nihResults: {};

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

  constructor(private formBuilder: FormBuilder, private nihDiApiService: NihDiApiService) { }

  ngOnInit() {
    this.emitPageTitle();
    this.getNIHResults();
  }

  // Get NIH drug interaction API results from the NihDiApiService.
  getNIHResults() {
    this.nihResults = this.nihDiApiService.fetchNIHResults();
    console.log(this.nihResults);
  }

  // Add a medication input field.
  medFormAddField() {
    this.meds.push(this.formBuilder.control(''));
  }

  // Delete a medication input field.
  medFormDeleteField(medIndex) {
    this.meds.removeAt(medIndex)
  }

  // Since the title/header for each view in this website is embedded in the 
  // parent side-nav component, we are emitting each child view's title via 
  // child --> parent data flow.
  emitPageTitle(): void {
    this.pageTitle.emit('Drug Interactions');
  }

  onSubmit() {
    console.log('this.medGroup:', this.medGroup.value);
  }

}
