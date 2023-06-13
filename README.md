# FedexAngularAssessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further explanation
The assesment asked to submit the form to the back end without the password value. I have taken the liberty to include this value as this would make sense. Normally I would ask a product owner (during a refinement) wether omitting a password was corect.

Furthermore I assumed this form would be part of a larger application, so I have added a mapper to map the ViewModel to the DTO model. As I was not sure if the password value would have to be included in the DTO. Using this pattern allows you to decouple the ViewModel and DTO model.

Email validation is done using the standard Angular email validation. As there is no correct way to validate an email address by regex and there are no business requirements set I have chosen this simple option which covers most cases.

The validation of the form is "soft" only so purely for UX purposes. Real validation should be handled on the back end.