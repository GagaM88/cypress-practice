const userData = {
    firstName: 'Dragana',
    lastName: 'Mitrovic',
    dob: '1988-05-31',
    address: 'Milutina Milankovica 12',
    postCode: '11000',
    city: 'Belgrade',
    state: 'Serbia',
    country: 'Serbia',
    phone: '0691234567',
    email: Math.round(Math.random()*100000)+"@email.com",
    password: 'Qwert123!',

}

const errorMessages = [
    {
        selector: '[data-test=first-name-error]',
        message: 'First name is required.'
    },
    {
        selector: '[data-test=last-name-error]',
        message: 'Last name is required.'
    },
    {
        selector: '[data-test=dob-error]',
        message: 'Date of Birth is required.'
    },
    {
        selector: '[data-test=address-error]',
        message: 'Address is required.'
    },
    {
        selector: '[data-test=postcode-error]',
        message: 'Postcode is required.'
    },
    {
        selector: '[data-test=city-error]',
        message: 'City is required.'
    },
    {
        selector: '[data-test=state-error]',
        message: 'State is required.'
    },
    {
        selector: '[data-test=country-error]',
        message: 'Country is required.'
    },
    {
        selector: '[data-test=phone-error]',
        message: 'Phone is required.'
    },
    {
        selector: '[data-test=email-error]',
        message: 'E-mail is required.'
    },
    {
        selector: '[data-test=password-error]',
        message: 'Password is required.'
    }
];
module.exports = {
    userData,
    errorMessages: errorMessages,
    form: 'app-register',
    firstNameInput: '#first_name',
    lastNameInput: '#last_name',
    dateOfBirthInput: '#dob',
    addressInput: '#address',
    postcodeInput: '#postcode',
    cityInput: '#city',
    stateInput: '#state',
    countryDropDown: '#country',
    phoneInput: '#phone',
    emailInput: '#email',
    passwordInput: '#password',
    registerButton: '[data-test=register-submit]',
    loginForm: 'app-login',
    errorMessagesSelect: '.alert-danger'
}
