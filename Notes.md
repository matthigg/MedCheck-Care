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
  |
  ├── AppComponent
  |   |
  |   ├── NavComponent
  |   |
  |   ├── DrugInteractionsComponent
  |   |
  |   ├── AboutComponent
  |   |
  |   ├── ContactComponent
  |   |
  |   ├── PrivacyPolicyComponent
  |   |
  |   └── TermsAndConditionsComponent
  |
  ├── NIHInteractionService
  |   
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