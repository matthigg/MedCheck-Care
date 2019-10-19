# MedCheck-Care

- This is a drug-drug interaction checking application that relies on the NIH API. It is a front-end app written in Angular that uses Angular routing, SCSS, and is hosted on Netlify.

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
  │   ├── NavComponent
  │   │
  │   ├── DrugInteractionsComponent
  │   │
  │   ├── AboutComponent
  │   │
  │   ├── ContactComponent
  │   │
  │   ├── PrivacyPolicyComponent
  │   │
  │   └── TermsAndConditionsComponent
  │
  ├── NIHInteractionService
  │   
  └── NIHListService

## SVG's

- To include svg tags so that you can manipulate & animate them, there are several approaches. 

- Components: you could create an individual component for each svg that you want to include in your view, and then embed that svg component within a host component in a parent/child relationship. 

- SVG Sprite Sheets: you could also create a "dumb" component that will act as a placeholder that can optionally display whichever svg you choose, where an svg is selected from a master svg template. This helps organize multiple svg's into one location, similar to a "sprite sheet".

  > With this approach, you can use the svg <use> tag to "clone" svg elements. 

  > Specifically, you define all of your individual svg's within a single parent <svg> tag, and delineate individual svg's by enclosing each one within <symbol> tags. You would then hide all of these individual svg's by assigning a "display: none" style (or something similar) to the parent <svg> tag. The resulting file constitutes the "sprite sheet". 
  
  > Afterwards you could then select and use an individual svg from this "sprite sheet" in a template by referencing it directly using a combination of the <use> tag and the svg's CSS id selector

  > In some cases, since svg's don't have HTML attributes in the traditional sense you have to use attribute-binding syntax, ie. attr.xlink:href (I forget which cases, need to refer back to this later).

  1. https://itnext.io/easy-way-to-organize-your-icons-using-svgs-in-angular-5-f35333d0b442
  2. https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
  3. https://stackoverflow.com/questions/35082657/angular2-svg-xlinkhref1
  4. https://css-tricks.com/svg-sprites-use-better-icon-fonts/

- Raw Loader: you could also use a custom Webpack build process that utilizes a "raw-loader".

  1. https://stackoverflow.com/questions/55724730/how-to-link-to-a-local-svg-file-in-the-angular-app

## Bootstrap 4

- The issue with using Bootstrap 4 with Angular 8 is that Bootstrap relies on JavaScript and jQuery for some of its animations. Using Angular alongside jQuery is generally thought to be a bad idea, because they both control elements within the DOM through completely separate mechanisms, and this can cause clashes and other unexpected bugs.

- One popular Angular-powered Bootstrap library is called "ng-bootstrap", which is written entirely in CSS and does not include any JavaScript or jQuery. It mimicks Bootstrap functionality by using various Angular directives from the ng-bootstrap library, which usually involve property- and event-binding. The downside is that you sometimes have to write custom CSS to mimick certain functionality that is missing from the ng-bootstrap directives, things that Bootstrap JavaScript/Popper/jQuery would normally handle. For example, the ng-bootstrap ngbCollapse directive does not support smooth navbar collapse animations.

- Another option is "ngx-bootstrap", which is basically the same thing as "ng-bootstrap" except that it features animations for some of its components and also supports Bootstrap v3 and v4, as opposed to just v4. 

  1. https://ng-bootstrap.github.io/#/getting-started
  2. https://www.techiediaries.com/angular-bootstrap-ui/
  3. https://stevenschwenke.de/AngularAndBootstrapUseNg-bootstrap

## Angular Material Design

- Angular Material Design is definitely an option to consider because it does not rely on jQuery, but it can still offer navbar expanding/collapsing animations. With Bootstrap, you either have to give in an install jQuery (which opens up opportunities for bugs and also adds a lot of bloat to your program) or go without jQuery and re-write any functionality that it would have provided. Angular material design, on the other hand, was written by Google specifically for Angular (which was also written by Google), and Material Design.

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

  > Installation - Error: EACCES: permission denied, rename... (10/19/2019): You can install "Angular CLI's install schematic" to set up an Angular Material project using the `ng add` command -- this installs both Angular Material and the Component Dev Kit (CDK) in ~/node_modules/material and ~/node_modules/cdk, respectively. However, if you don't install the CDK first then you'll run into a permissions error, as part of the installation process involves renaming/doing something with a file located in ~/node_modules/cdk. So to avoid this, just install the CDK first.

  1. https://material.angular.io/guide/getting-started
  2. https://material.angular.io/guide/schematics