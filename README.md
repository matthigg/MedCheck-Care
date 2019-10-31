# MedCheck-Care

- This is a drug-drug interaction checking application that relies on the NIH API. It is a front-end app written in Angular 8 that uses Angular routing, SCSS, and is hosted on Netlify.

  1. https://rxnav.nlm.nih.gov/InteractionAPIs.html#
  2. https://angular.io/
  3. https://netlify.com

## Prereqs

- NodeJS (node) 12.11.1
- Node Version Manager (nvm) 0.35.0 (optional)
- Node Package Manager (npm) 6.11.3
- TypeScript (tsc) 3.6.4
- Angular 8.2.10
- ng (Angular CLI) 8.3.8

- To verify installation:

  $ node --version
  $ nvm --version
  $ npm --version
  $ tsc --version
  $ ng --version

## Setup & Local Development

- To create a new Angular workspace:

  $ ng new <workspace name>

- To start a local development server @ localhost:4200:

  $ ng serve              // start the server without opening a new browser tab
  $ ng serve --open       // start the server & open a new browser tab

- The resulting page at localhost:4200 is called the "application shell". This shell is controlled by an automatically-generated Angular component named "AppComponent". You'll find the implementation of the shell AppComponent distributed over three files:

  1. app.component.ts   - the component class code, written in TypeScript.
  2. app.component.html - the component template, written in HTML.
  3. app.component.css  - the component's private CSS styles.

- The default Angular (skeleton) structure looks something like this:

[project root directory]
  |
  ├── e2e/                - 'end-to-end' tests that simulate real users
  |
  ├── node_modules/       - stores 3rd party libraries for local development
  |
  ├── src/                - source code
  |   ├── app/            - each app contains at least 1 module & 1 component
  |   ├── assets/         - static assets (img's, icons, etc.)
  |   ├── environments/   - stores config settings for local & production
  |   ├── favicon.ico     - browser favicon
  |   ├── index.html      - root HTML file
  |   ├── main.ts         - bootstraps the main module (app), starts program
  |   ├── polyfills.ts    - contains scripts for ECMA backwards compatibility
  |   ├── styles.css      - global CSS styles
  |   └── tests.ts        - used to set up tests
  |
  ├── .angular-cli.json   - config file for the Angular CLI
  ├── .editorconfig       - shared config settings for developer teams
  ├── .gitignore          - file exclusion list for git
  ├── karma.conf.js       - config file for karma, a JS test runner
  ├── package.json        - standard Node settings & dependencies file
  ├── protractor.conf.js  - tool for running 'end-to-end' tests
  ├── tsconfig.json       - typescript compiler settings
  └── tslint.json         - typescript linter settings

## Creating Components and Services using the Angular CLI

- To create a component:

  $ ng g c <component name>

  ... 'g' stands for 'generate'
  ... 'c' stands for 'component'

- Creating a component from the command line automates these tasks (where 'c' stands for 'component'):

  1. CREATE src/app/<c name>/<c name>.component.SCSS    // stylesheet
  2. CREATE src/app/<c name>/<c name>.component.html    // template
  3. CREATE src/app/<c name>/<c name>.component.spec.ts // test file
  4. CREATE src/app/<c name>/<c name>.component.ts      // component
  5. UPDATE src/app/app.module.ts                       // register component

- To create a service:

  $ ng g s <service name>

  ... 'g' stands for 'generate'
  ... 's' stands for 'service'

- Creating a service from the command line automates these tasks:

  1. CREATE src/app/<service name>.service.spec.ts   // test file
  2. CREATE src/app/<service name>.service.ts        // service

## Module, Components, & Services Structure

- This is an overview (and work in progress) of the structure for this site, starting at the default AppModule module:

[AppModule]
  │
  ├── AppComponent
  │   │
  │   ├── SvgSpriteSheetComponent
  │   │
  │   └── SideNavComponent
  │       │
  │       ├── DrugInteractionsComponent
  │       │
  │       ├── AboutComponent
  │       │
  │       ├── ContactComponent
  │       │
  │       ├── PrivacyPolicyComponent
  │       │
  │       └── TermsAndConditionsComponent
  │
  ├── NIHInteractionService
  │   
  └── NIHListService

## Routes

- Assuming that the workspace was set up to include the (optional) Angular Routing Module, the ~/src/app/app-routing.module.ts file was created and the routing module was imported and included in the imports[] array in AppModule, ie. ~/src/app/app.module.ts.

- To set up a route that leads to view:

-- ~/src/app/app-routing.module.ts

  ...
  import { <component name> } from './path/to/component';
  ...
  const routes: Routes = [
    { path: '<url route>', component: <component name> }
  ]

  ... note: this is pretty similar to adding routes to the urlpatterns[] list in any urls.py file in Django.

  1. https://angular.io/tutorial/toh-pt5

## SVG's

- To include SVG tags so that you can manipulate & animate them, there are several approaches. 

- Components: you could create an individual component for each SVG that you want to include in your view, and then embed that SVG component within a host component in a parent/child relationship. 

- SVG Sprite Sheets: you could also create a "dumb" component that will act as a placeholder that can optionally display whichever SVG you choose, where an SVG is selected from a master SVG template. This helps organize multiple SVG's into one location, similar to a "sprite sheet".

  > With this approach, you can use the SVG <use> tag to "clone" SVG elements. 

  > Specifically, you define all of your individual SVG's within a single parent <svg> tag, and delineate individual SVG's by enclosing each one within <symbol> tags. You would then hide all of these individual SVG's, ie. <symbol>'s, by assigning a "display: none" style (or something similar) to the parent <svg> tag. The resulting file constitutes the "sprite sheet". 
  
  > Afterwards you could then select and use an individual SVG's from this "sprite sheet" in a template by referencing it directly using a combination of the <use> tag and the SVG/<symbol>'s CSS ID selector. Specifically, the <use> tag must have an xlink:href attribute whose value is a CSS ID selector that targets the  SVG/<symbol>'s ID attribute. For example:
  
-- ~/src/app/svg-sprite-sheet/svg-sprite-sheet.component.html
    <svg>
      <symbol id="#svg-logo">
        ...
      </symbol>
    </svg>

-- ~/src/app/

    ...
      <svg>
        <use xlink:href="#svg-logo" />
      </svg>
    ...

  > The issue with using the <use> tag to swap in SVG/<symbol>'s is that the <use> tag will insert SVG/<symbol>'s into the Shadow DOM. In the Shadow DOM, you can't always directly target elements using CSS -- you can pass them attributes indirectly like "fill" and "stroke" from a parent wrapper object (or from the <use> element itself, which acts as a wrapper over SVG/<symbol>'s) but you can't directly grab elements in the Shadow DOM. For example, you can't assign pseudoclasses like :hover to elements located in the Shadow DOM. 

  > Another issue is that if you create a "sprite sheet" in Angular as a separate component, Angular will encapsulate all of its views on a per-component basis. That means that, in addition to limited access to the SVG/<symbol>'s that have been inserted into the Shadow DOM via the <use> tag, they are also assigned custom & randomized Angular attributes in order to encapsulate them to their environment of their component. This means that there are 2 obstacles to overcome when trying to access and manipulate SVG/<symbol>'s in an Angular project that come from a stand-alone "sprite sheet" component.

  1. https://itnext.io/easy-way-to-organize-your-icons-using-svgs-in-angular-5-f35333d0b442
  2. https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
  3. https://stackoverflow.com/questions/35082657/angular2-svg-xlinkhref1
  4. https://css-tricks.com/svg-sprites-use-better-icon-fonts/
  5. https://stackoverflow.com/questions/13673441/svg-use-element-and-hover-style
  6. https://stackoverflow.com/questions/46353027/changing-css-with-svg-symbols-on-hover

- Raw Loader: you could also use a custom Webpack build process that utilizes a "raw-loader".

  1. https://stackoverflow.com/questions/55724730/how-to-link-to-a-local-svg-file-in-the-angular-app

## Bootstrap 4

- When using a front-end framework like Angular, it's generally a good idea to let that framework have total responsibility when it comes to controlling the front-end. The issue with using Bootstrap 4 with Angular 8 is that Bootstrap relies on JavaScript and jQuery for some of its animations. Using Angular alongside jQuery is generally thought to be a bad idea, because they both control elements within the DOM through completely separate mechanisms, and this can cause clashes and other unexpected bugs.

- One popular Angular-powered Bootstrap library is called "ng-bootstrap", which is written entirely in CSS and does not include any JavaScript or jQuery. It mimicks Bootstrap functionality by using various Angular directives from the ng-bootstrap library, which usually involve property- and event-binding. The downside is that you sometimes have to write custom CSS or methods to mimick certain functionality that is missing from the ng-bootstrap directives, things that Bootstrap JavaScript/Popper/jQuery would normally handle. For example, the ng-bootstrap ngbCollapse directive does not support smooth navbar collapse animations.

- Another option is "ngx-bootstrap", which is basically the same thing as "ng-bootstrap" except that it features animations for some of its components and also supports Bootstrap v3 and v4, as opposed to just v4.

  1. https://ng-bootstrap.github.io/#/getting-started
  2. https://www.techiediaries.com/angular-bootstrap-ui/
  3. https://stevenschwenke.de/AngularAndBootstrapUseNg-bootstrap
  4. https://medium.com/@tiboprea/build-a-responsive-bootstrap-4-navbar-in-angular-5-without-jquery-c59ad35b007

## Angular Material

- Angular Material is definitely an option to consider because it does not rely on jQuery -and- it still offers navbar expanding/collapsing animations (albeit through a side navbar). With Bootstrap, you either have to install jQuery (which opens up opportunities for bugs and also adds a lot of bloat to your program) or go without jQuery and re-write the missing functionality.

- Another consideration is that Angular Material was written by Google specifically for Angular, which was also written by Google, so support is likely to continue to be pretty good.

- The downside to Angular Material is that it doesn't control the overall layout of a webpage like Bootstrap's flexbox and grid system. This may be due to the fact that Angular Material was not originally written with a "mobile-first" focus in mind. However, there is another library called Angular Flex Layout which fills in this gap, and is typically used in conjunction with Angular Material.

- Installation - you can select a pre-built or custom "theme" for the entire application, you can choose to install HammerJS for "gesture recognition" which is required by some components, ie. mat-slider, and you can choose the BrowserAnimationsModule which enables Angular's animation system. To install using the Angular CLI:

  $ ng add @angular/cdk
  $ ng add @angular/material

  ... if you selected a theme during installation, you have to then import that theme in the ~/src/styles.scss file or reference it directly using an HTML <link> tag (from, I guess, within the ~/src/index.html template). 

    1. https://material.angular.io/guide/theming#using-a-pre-built-theme

  ... to verify installation:

  $ npm list @angular/cdk
  $ npm list @angular/material
  $ npm list hammerjs (responsible for "gesture recognition")

- Troubleshooting

  > Installation - Error: EACCES: permission denied, rename... 
    - (10/19/2019): You can install "Angular CLI's install schematic" to set up an Angular Material project using the `ng add` command -- this installs both Angular Material and the Component Dev Kit (CDK) in ~/node_modules/material and ~/node_modules/cdk, respectively. However, if you don't install the CDK first then you'll run into a permissions error, as part of the installation process involves renaming/doing something with a file located in ~/node_modules/cdk. So to avoid this, just install the CDK first.

  > Form Fields - Error: mat-form-field must contain a MatFormFieldControl. 
    - (10/31/2019): Using the Angular Material Form Field Module requires importing both MatFormFieldModule -and- MatInputModule, the later of which is not specified in the documentation as far as I can see:

      1. https://material.angular.io/components/form-field/api

  1. https://material.angular.io/guide/getting-started
  2. https://material.angular.io/guide/schematics
  3. https://codinglatte.com/posts/angular/angular-flex-better-than-bootstrap/

## Angular Material Sidenav & Overall View Anatomy (for this project)

- This site went with Angular Material's sidenav for the main navigation component, which means that all of the views in the site are embedded within the <app-side-nav> element of the SideNavComponent's template. This sidenav component's template has a "title" field that displays the title/header of each different page view. 

- The individual page views are rendered via the AppRoutingModule, which will replace/swap its <router-outlet> element with the template of whichever component the user/client is currently requesting to view. The nesting structure looks something like this:

-- ~/src/app/app.component.html

  <app-side-nav>
    <h1>{{ pageTitle }}</h1>
    ...
    <router-outlet></router-outlet> // this is a placeholder for all other views
    ...
  </app-side-nav>

  ... if you were to navigate to the "about" view, for instance, the structure would (roughly) rearrange to look something like this:

-- ~/src/app/app.component.html

  <app-side-nav>
    <h1>{{ pageTitle }}</h1>
    ...
    <app-about></app-about> // the "about" view gets swapped in
    ...
  </app-side-nav>

  ... when the "about" view gets swapped in, it needs some way to change the {{ pageTitle }} interpolation/template expression to reflect the new view, ie. <h1>About</h1>.

- In a situation that does not involve the AppRoutingModule, or Angular routing, you would perhaps nest the "About" view directly within the sidenav component. In this situation, you could use the @Input and @Output decorators to handle dataflow between the about component and sidenav component in a parent/child relationship type of manner (in this project, you would just need to @Output the title from the child component so that the parent sidenav component would see it).

- However, since this (and most) sites are dynamic, and the "About" view isn't the only view, we're using Angular routing which creates the above scenario where there isn't -technically- a parent/child relationship. To solve this problem, you can either A) create a service to handle changing the page title, or B) use the <router-outlet>'s built-in "activate" and "deactivate" functions which automatically emit whenever a component is swapped in/created, or swapped out/destroyed. This project uses the "activate" and "deactivate" functions to simulate a parent/child relationship between the sidenav component and all of the other components whose views can be displayed within the sidenav.

## Reactive Forms vs. Template Forms

- Angular offers two approaches to handling user input with forms: reactive and template-based. Reactive forms are more robust in that they're more scalable, reusable, and testable, whereas template forms are easier to add and much simpler. 

- Both types use a "form model", similar to Django. In both types of forms there is a single source of truth -- in reactive forms it is the form model, in template forms it is the template itself.

- Dataflow in reactive forms is synchronous and 1 way: either from the view to the model, or from the model to the view. This is part of what makes them easier to test. Additionally, each time a change is triggered to a form model the FormControl instance returns a new data model rather than updating the existing one, which means that the data structure is immutable.

- Dataflow in template forms is asynchronous and managed by a directive like NgModel that handles 2-way data binding. This means that template forms are mutable, since they rely on 2-way data binding which updates the form model as changes are made in the template.

  1. https://angular.io/guide/forms-overview

## Reactive Forms Overview

- To use reactive forms requires importing ReactiveFormsModule into ~/src/app/app.module.ts and including it in @NgModele's array of imports[] (or whatever module you're using it in).

- Next, the reactive form can be bound to elements in the DOM via either the [formControl] or [formGroup] bindings, where [formControl] is usually bound to a single input form field and [formGroup] is usually bound to a collection of input form fields, or an array of fields. For example:

  > Using a single Form Control:

    <label>First Name:<br>
      <input [formControl]="firstName">
    </label>

  > Using a Form Group:

    <form [formGroup]="newUserForm">        // formGroupName is also valid
      <label>First Name:<br>
        <input formControlName="firstName"> // notice syntax change
      </label>
      <label>Last Name:<br>
        <input formControlName="lastName">  // [formControl] is also valid
      </label>
    </form>

    ... note: I think the syntax is interchangeable, need to 2x check later.

- In the component, the Form Group would look something like this:

  ...
  @Component({
    ...
  })
  export class NewUserComponent {
    newUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })

    constructor() {}
    ...
  }

- Form Control values can be displayed in two ways:

  > Using the valueChanges observable, which can be listened to for changes using AsyncPipe in a template, or *.subscribe() in a component class.

  > Using the *.value property in a template expression, which gives you a snapshot of the current value.

- Form Control values can be altered by a user when they type information into an input field/check a checkbox/etc, or programmatically within a component class using the *.setValue() method.

- Writing out the syntax to create a reactive form model in a component is pretty verbose, but there is a slightly more terse approach which involves using a Form Builder, which is a dependency injection whose singleton instance can take an object as an argument and use that as a model to create a form.

- Form Arrays are similar to Form Controls except that you can generate an arbitrary number of them programmatically. This is useful when you have an indeterminate number of input fields, ie. a drug-drug interaction form that can accept between 2 and 50 different drugs to check for interactions, which can be created or deleted by anyone using the form. They can be created using the *.array() method of a Form Builder instance.

- Form Arrays must exist within a Form Group, and cannot stand alone (unlike Form Controls).

  1. https://angular.io/guide/reactive-forms

## NIH APIs

- This site uses following NIH APIs:

  1. RxNorm Approximate Term API
    > https://rxnav.nlm.nih.gov/RxNormAPIs.html#uLink=RxNorm_REST_getApproximateMatch

  2. RxNorm Properties (by rxcui) API
    > https://rxnav.nlm.nih.gov/RxNormAPIs.html#uLink=RxNorm_REST_getRxConceptProperties

  3. RxNorm RxCUI (by name) API
    > https://rxnav.nlm.nih.gov/RxNormAPIs.html#uLink=RxNorm_REST_findRxcuiByString

  4. Drug Interaction API
    > https://rxnav.nlm.nih.gov/InteractionAPIs.html#

- The Approximate Term and Properties APIs are used to generate typeahead suggestions, while the RxCUI and Drug Interaction APIs are used to retrieve a list of possible drug-drug interactions.

- Drugs searches are made using the ReactiveFormsModule to create a "reactive form" in the DrugInteractionsComponent template. The form allows uers to dynamically create new fields, ie. "Form Controls"., or delete them.

- Monitoring user input in the input fields, as well as utilizing all of the NIH APIs requires the use of a lot of observers to handle the reponses from all of the API requests. Observers have to be subscribed to before they will emit/share the results of an API request, but they also have to be unsubscribed from when they are no longer needed. This relationship, or "subscription" ties up memory, and if the subscription is no longer needed but still using memory then it constitutes a memory leak.

- There are several strategies for dealing with subscriber-related memory leaks in Angular. This site takes an approach that is probably not ideal, but anyways. Every time an observable/event emitter in the DrugInteractionsComponent is subscribed to, the subscriber is added to a global, private _subscription object of type Subscription. During the ngOnDestroy() lifecycle-hook, this private _subscription object executes its *.unsubscribe() method, which conveniently unsubscribes all subscriptions that it contains (which ideally -should- be every active/open or inactive/closed subscription that is part of the component being destroyed). 

- A better approach to handling subscriber-related memory leaks is to use the RxJS library's *.takeUntil() method to handle subscriptions, more info can be found here:

  1. https://stackoverflow.com/questions/41364078/angular-2-does-subscribing-to-formcontrols-valuechanges-need-an-unsubscribe/46893278

## Testing

- There are generally 3 categories of front-end testing: unit, integrated, and end-to-end (e2e). In Angular, each of these types of tests might take the following descriptions:

  1. Unit       - testing an individual component
  2. Integrated - testing a component + its template
  3. End-to-end - testing a component, its template, services, routing, etc.

- Angular 8 comes packged together with Karma and Jasmine for unit and integration tests, as well as Protractor for end-to-end tests (I think, I don't know anything about Protractor yet). When creating modules, components, and services using the Angular CLI, Jasmine test files with the *.spec.ts extension are automatically generated. You can automate all tests to continually run from the command line via:

  $ ng test

- Karma is a test runner that automates running Jasmine tests from the command line. In Angular, this would be accomplished by running the `ng test` command mentioned above.

- Jasmine is a test framework used to write tests with a straight-forward and descriptive syntax that is characterized as "behavior-driven development", or BDD (which is a specific type of test-driven development, or TDD). 

  > Jasmine test are grouped together by "test suites", which are a collection of "test specs" which characterize individual tests. Specifically, Jasmine's describe() function defines a "test suite", and Jasmine's it() function defines a "test spec". Typically, you'll see a describe() function containing one or more it() functions.

  > Each it() function usually consists of an expect() function in conjunction with some kind of comparative method, like *.toEqual(). The expect() function is a "test expectation". There is a list of these so-called comparative methods in Jasmine, which are officially referred to as "matcher expressions". The expect() function, along with its "matcher expression", make up the specific syntax that is used to evaluate a specific test. For example:

    describe('Hello World Function', () => {
      it('says hello', () => {
        expect(helloWorld()).toEqual('Hello World!'); // specific test 
      });
    });

  ... note that you can disable describe() and it() functions by prepending them with "x", ie. xdescribe(), xit(). Conversely, you can "focus" on, or give precedence to certain describe() and it() functions while ignore other by prepending them with "f", ie. fdescribe(), fit(). 

- In addition to "test suites" and "test specs", tests sometimes include periods of set-up and tear-down activities which are used to create or destroy certain parts of the testing environment. Some of these functions include:

  > beforeAll   - called once before a test suite runs
  > afterAll    - called once after a test suite runs
  > beforeEach  - called before each test spec runs
  > afterEach   - called after each test spec runs

- To manually run a Jasmine test, you would create an HTML file, along with any relevant CSS and JavaScript. You would place the Jasmine test.js file -after- all other JavaScript (and, I guess, CSS) has been loaded, near the bottom of the HTML file, and then view the page in a browser or an online editor like Plunker. Jasmine runs after window.onload fires. Each time you make a change and want to run another Jasmine test, you just have to reload the browser to trigger another window.onload event. 

- However, constantly reloading the browser to run Jasmine tests can get tedious, which is where Karma comes in. Karma is a task runner which can spawn browser windows and run Jasmine tests inside of those windows from the command line. It can display the results of those tests both in the browser window, and in the command line environment. 

- Additionally, Karma can watch development files and re-run these Jasmine tests automatically (which characterizes its "hot reloading" feature in the browser window).

- When running test using the automatically-generated test stubs in Angular, ie. the *.spec.ts files, it's important to manually import modules in some of the test, since they are not automatically included. Some modules that usually need to be manually imported into the test for components that use them are RouterTestingModule, ReactiveFormsModule, and HttpClientTestingModule. 

  1. https://codecraft.tv/courses/angular/unit-testing/jasmine-and-karma/
  2. https://stackoverflow.com/questions/47236963/no-provider-for-httpclient


## ---------- Boilerplate Angular 8 README below this point --------------------

# MedCheckCare

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
