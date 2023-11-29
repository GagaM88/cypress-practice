import registration from '../selectors/register_user';
// Using contain since didn't find the way to use .trim on wrapped element

describe('Register a new user', () => {
    let userEmail = '';

    it('Verify that user can successfully complete registration', () => {
        cy.visit('/#/auth/register');
        userEmail = registration.userData.email
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

    it('Verify that appropriate error messages display for empty fields during registration', () => {
        cy.visit('/#/auth/register');
        cy.get(registration.registerButton).click()
        cy.get(registration.errorMessagesSelect)
            .should('have.length', 11)
            .each((message, index) => {
                cy.wrap(message).should('be.visible')
                .and('have.css', 'background-color', 'rgb(248, 215, 218)')
                .and('have.css', 'color', 'rgb(88, 21, 28)')
                .contains(registration.errorMessages[index].message)
        })
    });

    it('Verify that user receives an error for an invalid email format during registration', () => {
        cy.visit('/#/auth/register');
        const wrongEmail = 'testuser@gmail'
        cy.get(registration.form).should('be.visible');
        cy.get(registration.firstNameInput).type(registration.userData.firstName);
        cy.get(registration.lastNameInput).type(registration.userData.lastName);
        cy.get(registration.dateOfBirthInput).type(registration.userData.dob);
        cy.get(registration.addressInput).type(registration.userData.address);
        cy.get(registration.postcodeInput).type(registration.userData.postCode);
        cy.get(registration.cityInput).type(registration.userData.city);
        cy.get(registration.stateInput).type(registration.userData.state);
        cy.get(registration.countryDropDown).select(registration.userData.country);
        cy.get(registration.phoneInput).type(registration.userData.phone);
        cy.get(registration.emailInput).type(wrongEmail);
        cy.get(registration.passwordInput).type(registration.userData.password);
        cy.get(registration.registerButton).click();
        cy.get(registration.errorMessagesSelect).should('be.visible')
            .contains('E-mail format is invalid.');
    });

    it('Verify that user cannot register with an existing email', () => {
        cy.visit('/#/auth/register');
        cy.get(registration.form).should('be.visible');
        cy.get(registration.firstNameInput).type(registration.userData.firstName);
        cy.get(registration.lastNameInput).type(registration.userData.lastName);
        cy.get(registration.dateOfBirthInput).type(registration.userData.dob);
        cy.get(registration.addressInput).type(registration.userData.address);
        cy.get(registration.postcodeInput).type(registration.userData.postCode);
        cy.get(registration.cityInput).type(registration.userData.city);
        cy.get(registration.stateInput).type(registration.userData.state);
        cy.get(registration.countryDropDown).select(registration.userData.country);
        cy.get(registration.phoneInput).type(registration.userData.phone);
        cy.get(registration.emailInput).type(userEmail);
        cy.get(registration.passwordInput).type(registration.userData.password);
        cy.get(registration.registerButton).click();
        cy.get(registration.errorMessagesSelect).should('be.visible')
            .and('have.text', 'A customer with this email address already exists.');
    });
});
