const errorMessages = [
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
    errorMessages,
    emailInput: 'input[data-test=email]',
    passwordInput: 'input[data-test=password]',
    loginButton: 'input[data-test=login-submit]',
    pageTitle: 'h1[data-test=page-title]',
    pageText: 'app-overview > p'
}