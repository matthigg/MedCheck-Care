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