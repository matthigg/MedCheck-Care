import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Output() pageTitle = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.pageTitle.emit('Contact');
  }

}
