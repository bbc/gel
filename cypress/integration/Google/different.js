import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://google.com';

Given('I kinda open Google page', () => {
  cy.visit(url);
});

// This could be the same step that we have in another definition file, but we
// don't have to worry about collisions thanks to 'nonGlobalStepDefinitions'.
Then('I am very happy', () => {
  cy.title().should('include', 'Google');
});

