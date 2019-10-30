import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {

  // This observable is used to detect whether or not the screen width is <= 960
  // pixels, ie. "Handset" size. It is part of Angular Material's "Sidenav" 
  // component, and is referenced in ~/src/app/side-nav/side-nav.component.html
  // several times in combination with async pipes. However, async pipes can't
  // be used in combination with event binding, ie. (click), so there is also 
  // a subscription to this observable in order to handle closing the side nav on 
  // "Handset" sized screens, ie. screens <= 960 pixels wide, when a navigation
  // link is clicked.
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  handsetScreenActive: boolean
  handsetSubscription: Subscription

  // This variable holds the title that is emitted from whichever child component
  // view is currently rendered at the location of <router-outlet> in the
  // ~/src/app/side-nav/side-nav.component.html template.
  pageTitle: string
  pageTitleSubscription: Subscription

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    // Make the screen width oberservable available to the template as a property
    this.handsetSubscription = this.isHandset$.subscribe(
      value => this.handsetScreenActive = value
    )
  }

  ngOnDestroy() {
    this.handsetSubscription.unsubscribe()
  }

  // This function is triggered by <router-outlet>'s (activate) event, which
  // occurs whenever a component is rendered via the AppRoutingModule.
  componentAdded(component: {pageTitle: EventEmitter<string>}): void {
    this.pageTitleSubscription = component.pageTitle
      .pipe(first())
      .subscribe(title => this.pageTitle = title)
  }
}
