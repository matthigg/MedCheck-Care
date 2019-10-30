import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // @Output() pageTitle = new EventEmitter<string>();
  pageHeader: string = 'About';

  constructor() { }

  ngOnInit() {
    // this.pageTitle.emit('About');
  }
}