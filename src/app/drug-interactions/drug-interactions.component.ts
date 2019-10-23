import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drug-interactions',
  templateUrl: './drug-interactions.component.html',
  styleUrls: ['./drug-interactions.component.scss']
})
export class DrugInteractionsComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();

  // Initialize two drug-drug interaction fields
  medFormFields = { med1: [''], med2: [''] }
  medGroup: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.medFormBuild();
    this.emitPageTitle();
  }

  // Add a medication field
  medFormAddField() {
    let numMeds: number = Object.keys(this.medFormFields).length;
    this.medFormFields['med' + ++numMeds] = [''];
    this.medFormBuild()
  }

  // Build the form -- currently there is an initial build when the component
  // loads/initializes, and subsequent builds if a user requests more medication
  // fields
  medFormBuild() {
    this.medGroup = this.formBuilder.group(this.medFormFields)
  }

  // Since the title/header for each view in this website is embedded in the 
  // parent side-nav component, we are emitting each child view's title via 
  // child --> parent data flow.
  emitPageTitle(): void {
    this.pageTitle.emit('Drug Interactions');
  }

  onSubmit() {
    console.log('submit')
  }

}
