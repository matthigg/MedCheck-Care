import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title) { }

  setTitle(newTitle: string) {
    const newTitleModified: string = newTitle + ' - MedCheck.care | Drug Interactions Tool' 
    this.titleService.setTitle(newTitleModified);
  }
}