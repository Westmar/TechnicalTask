const utils = require('../utils'),
    by = utils.by,
    config = require('../config'),
    driver = utils.initDriver(),
    webdriver = require('selenium-webdriver');

let time = 10000;

async function load() {

    driver.get(config.goodreadsServer);
}

async function init() {

    let logo = driver.findElement(by.attr('id', 'logo'));
    driver.wait(logo, time);

}

async function openGoogleAcc() {

    let href = driver.findElement(by.href('/google_accounts/sign_in'));
    driver.wait(href, time);
    href.click();
}

async function singUpForm(firstName, email, password) {

    let firstNameForm = driver.findElement(by.name('user[first_name]'));
    driver.wait(firstNameForm, time);
    firstNameForm.sendKeys(firstName);
    let emailForm = driver.findElements(by.name('user[email]'));
    driver.wait(emailForm, time);
    emailForm.then(collection => collection[1].sendKeys(email));
    let passwordForm = driver.findElements(by.name('user[password]'));
    driver.wait(passwordForm, time);
    passwordForm.then(collection => collection[1].sendKeys(password));
    let buttonNext = driver.findElement(by.name('next'));
    driver.wait(buttonNext, time);
    buttonNext.click();

}

async function singInForm(email, password) {

    let emailForm = driver.findElement(by.name('user[email]'));
    driver.wait(emailForm, time);
    emailForm.sendKeys(email);
    let passwordForm = driver.findElement(by.name('user[password]'));
    driver.wait(passwordForm, time);
    passwordForm.sendKeys(password);
    let buttonNext = driver.findElement(by.attr('type', 'submit'));
    driver.wait(buttonNext, time);
    buttonNext.click();

}

async function confirmSingIn(email, password) {

    // if server return "Your session timed out, please try again"!

    let emailForm = driver.findElement(by.name('user[email]'));
    driver.wait(emailForm, time);
    emailForm.sendKeys(email);
    let passwordForm = driver.findElement(by.name('user[password]'));
    driver.wait(passwordForm, time);
    passwordForm.sendKeys(password);
    let buttonNext = driver.findElement(by.attr('type', 'submit'));
    driver.wait(buttonNext, time);
    buttonNext.click();

}

async function flashError() {

    let error = driver.findElement(by.className('flash error'));
    driver.wait(error, time);

}

module.exports = {

    init,
    load,
    openGoogleAcc,
    singUpForm,
    singInForm,
    confirmSingIn,
    flashError
};