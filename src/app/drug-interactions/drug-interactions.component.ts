import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();

  // Define the form model, which includes two drug-drug interaction fields. If 
  // a user later adds more fields to the form, then this model will change.
  medFormFields = { med1: [''], med2: [''] }

  // Declare a form group that will include 2 or more form controls, ie.
  // medication input fields.
  medGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.medFormBuild();
    this.emitPageTitle();
  }

  // Add a medication input field.
  medInputFieldIndex: number = Object.keys(this.medFormFields).length + 1;
  medFormAddField() {

    // Generate a name for the new medication input field.
    const newFieldName = 'med' + this.medInputFieldIndex++;

    // Save the form group input values so that they can later be re-inserted 
    // into the form via the setValue() method.
    const medGroupValue = this.medGroup.value;
    medGroupValue[newFieldName] = '';

    // Add a new medication input field to the form model, then rebuild the form
    // to reflect the change.
    this.medFormFields[newFieldName] = [''];
    this.medFormBuild();
    
    // Re-insert any medication input field values that a user may have typed 
    // before adding a new medication input field.
    this.medGroup.setValue(medGroupValue);
  }

  // Delete a medication input field.
  medFormDeleteField(field) {
    delete this.medFormFields[field.key]
  }

  // Build the form -- currently there is an initial build when the component
  // loads/initializes, and subsequent builds if a user requests more medication
  // fields.
  medFormBuild() {
    this.medGroup = this.formBuilder.group(this.medFormFields);
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
