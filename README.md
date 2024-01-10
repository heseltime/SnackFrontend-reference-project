# SnackFrontend (Project Description)

## Structure

```
src
|-- app
|  |-- discover-restaurants <--- *route: /restaurants ---------------- user view of this app, main part: see assumptions.txt
|  |  |-- find-restaurants
|  |  |  |-- restaurant-detail
|  |  |  |  |-- order form
|  |  |-- my-orders
||||-- home <------------------- *route: /manage --------------------- restaurant view: authentication required
||||  |-- incoming-orders
||||  |-- my-restaurant with menu upload, and delivery condition/other info editing
|  |-- login
|  |-- register
|  |-- page-not-found
|  |-- shared
|  |  |-- discover-restaurants.service.ts
|  |  |-- discover-restaurants.model.ts?
|  |  |-- discover-menus.model.ts?
|  |  |-- discover-... .model.ts? - all the models in the end
|  |  |-- manage-restaurant.service.ts
|  |  |-- theme.service.ts - just for testing
||||-- app.module.ts incl. AuthModule for OpenID Connect/0Auth authentication with Auth0 (Okta - https://auth0.com/)
|-- styles.css, assets and environments
|-- index.html
```

## High-level Overview with Screenshots

# TODO

## Assumptions Made About Task

* one single student, already logged in, central order management (student perspective)
    See testStudent in discover-restaurants.component.ts
* also only orders per session stored: local storage for this (data model not built out to link customers and orders, actually)
* finally: example Restaurant Burgerei assumed, because no association between manager login and restaurants in back in as per spec.
    See testRestaurant and testApiKey in home.component.ts (testRestaurant also in login.component.ts)
* no creation of username and pwrd at registration, 
    also for simplicity at registration current machine's location data is used for restaurant

# SnackFrontend (Angular Instructions)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
