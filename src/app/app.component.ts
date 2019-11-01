import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title, public router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-151360300-1', { 'page_path': event.urlAfterRedirects });
      }
    })
  }

  setTitle(newTitle: string) {
    const newTitleModified: string = newTitle + ' - MedCheck.care | Drug Interactions Tool' 
    this.titleService.setTitle(newTitleModified);
  }
}