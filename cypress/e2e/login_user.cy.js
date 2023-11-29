import form from '../selectors/login_user'
import registration from '../selectors/register_user'

describe('Login user', () => {
    let userEmail = registration.userData.email
    before(() => {
        // This should be done via API as a custom cypress command
        cy.visit('/#/auth/register');
        cy.get(registration.form).should('be.visible');
        cy.get(registration.firstNameInput).should('be.visible').type(registration.userData.firstName);
        cy.get(registration.lastNameInput).should('be.visible').type(registration.userData.lastName);
        cy.get(registration.dateOfBirthInput).should('be.visible').type(registration.userData.dob);
        cy.get(registration.addressInput).should('be.visible').type(registration.userData.address);
        cy.get(registration.postcodeInput).should('be.visible').type(registration.userData.postCode);
        cy.get(registration.cityInput).should('be.visible').type(registration.userData.city);
        cy.get(registration.stateInput).should('be.visible').type(registration.userData.state);
        cy.get(registration.countryDropDown).select(registration.userData.country);
        cy.get(registration.phoneInput).should('be.visible').type(registration.userData.phone);
        cy.get(registration.emailInput).should('be.visible').type(userEmail);
        cy.get(registration.passwordInput).should('be.visible').type(registration.userData.password);
        cy.get(registration.registerButton).click()
        cy.get(registration.loginForm).should('be.visible')
    });

    it('Verify that the user can successfully log in', () => {
        cy.visit('/#/auth/login')
        cy.get(form.emailInput).type(userEmail)
        cy.get(form.passwordInput).type(registration.userData.password)
        cy.get(form.loginButton).click()
        cy.get(form.pageTitle).should('be.visible')
            .and('have.text', 'My account');
        cy.get(form.pageText).should('be.visible')
            .and('have.text', 'Here you can manage your profile, favorites and orders.');
    });

    it('Verify that appropriate error messages display for invalid login credentials', () => {
        cy.visit('/#/auth/login')
        cy.get(form.emailInput).type(userEmail)
        cy.get(form.passwordInput).type('Qwer')
        cy.get(form.loginButton).click()
        cy.get(registration.errorMessagesSelect).should('be.visible')
            .and('have.text', 'Invalid email or password')
    });

    it('Verify that empty fields trigger validation errors during login', () => {
        cy.visit('/#/auth/login')
        cy.get(form.loginButton).click()
        cy.get(registration.errorMessagesSelect).should('have.length', 2)
            .each((message, index) => {
                cy.wrap(message).should('be.visible')
                .and('have.css', 'background-color', 'rgb(248, 215, 218)')
                .and('have.css', 'color', 'rgb(88, 21, 28)')
                .contains(form.errorMessages[index].message)
            });
    });

    it('Verify that user account locks after multiple incorrect login attempts', () => {
        cy.visit('/#/auth/login')
        const wrongPassword = 'Qwert'
        cy.get(form.emailInput).type(userEmail)
        cy.get(form.passwordInput).type(wrongPassword)
        Cypress._.times(5, () => {
            cy.get(form.loginButton).click()
        })
        cy.get(registration.errorMessagesSelect).should('be.visible')
            .and('have.text', 'Account locked, too many failed attempts. Please contact the administrator.')
    });
});