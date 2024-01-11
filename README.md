# SnackFrontend (Project Description)

Best formatting with screenshots: https://github.com/heseltime/SnackFrontend-reference-project/blob/main/README.md

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

Student perspective of restaurant options and order (unsucessful and successful cases):

<img width="473" alt="Screenshot 2024-01-11 013545" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/29bdeb11-3315-42a2-bf78-278f3a17a572">

<img width="473" alt="Screenshot 2024-01-11 013610" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/08a54f6b-9a11-4c5f-90e6-ee8e1f2ac716">

<img width="479" alt="Screenshot 2024-01-11 013621" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/9cc7ad91-d1dd-4744-9335-17b044fe9bd0">

In the successful case a green alert is display for a second or so and a redirect to the front page with the current order listed clearly is made:

<img width="482" alt="Screenshot 2024-01-11 013724" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/c39d4bcc-9f02-4e99-8806-bf54b1f0865a">

Restaurant login via Auth0:

<img width="445" alt="Screenshot 2024-01-11 013818" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/5561011b-2f97-407a-bcd3-8c5995ee46ed">

As an example, I can log in with my Google account and the user data is available then.

<img width="448" alt="Screenshot 2024-01-11 013830" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/b14c8966-e0ac-4fdf-a9f4-1ae2dc5e36f0">

<img width="480" alt="Screenshot 2024-01-11 013843" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/aa3dd71a-4f17-4026-adc5-fe1bd89f9056">

I can add menu items and delete the existing ones, and see all incoming orders too, in one page as a simple editing mechanism.

<img width="521" alt="Screenshot 2024-01-11 013925" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/6a4e5461-a20c-4c45-9710-660f151ff644">


<img width="473" alt="Screenshot 2024-01-11 013941" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/e99a0467-d0ab-4be8-8d2b-69493780c6e2">

Exactly the same for delivery rules:

<img width="499" alt="Screenshot 2024-01-11 013952" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/731aabf0-da50-4eb2-ae0c-329d249f3255">

Restaurant sign up is a simple form with validation:

<img width="487" alt="Screenshot 2024-01-11 014607" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/58a93528-0784-4b31-be89-10e5842652f3">

<img width="476" alt="Screenshot 2024-01-11 014627" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/b1ac68da-6e60-4c49-a039-89d42bc668c4">

<img width="472" alt="Screenshot 2024-01-11 014702" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/8ef80ec6-44eb-4482-b71e-b71a236a1572">

<img width="527" alt="Screenshot 2024-01-11 014714" src="https://github.com/heseltime/SnackFrontend-reference-project/assets/66922223/12e9080a-7859-41c3-852b-a1ed37c8a94e">

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
