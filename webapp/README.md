
# Guide

ng generate component x
create app/x.ts
add <app-x></app-x> to app.component.html
ng generate module app-routing --flat --module=app
 --flat puts the file in src/app instead of its own folder.
 --module=app tells the CLI to register it in the imports array of the AppModule.


# Bootstrap installation:

  Via command line interface navigate to the project folder. Then use npm to install bootstrap:
  - npm install --save bootstrap. The --save option will make bootstrap appear in the dependencies.
  - Edit the .angular-cli.json file, which configures your project. It's inside the project directory. Add a reference to the   "styles" array. The reference has to be the relative path to the bootstrap file downloaded with npm. In my case it's: "../node_modules/bootstrap/dist/css/bootstrap.min.css",

  navbar to collapse mobile
  - npm install --save @ng-bootstrap/ng-bootstrap
  https://stackoverflow.com/questions/47228347/collapse-not-working-in-ng-bootstrap-and-angular-4-app-for-navbar-breadcrumb-but
  sopra il riferimento all'articolo ma nel file app.componet.html e app.component.ts vi e' la versione funzionante
  che funziona come l'originale

# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. Inserito da me ./deploy

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
