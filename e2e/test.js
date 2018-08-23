const test = require('selenium-webdriver/testing'),
    utils = require('../utils'),
    user = utils.userSingUp(),
    login = utils.userSingIn(),
    helpers = require('../helpers');

let driver = utils.initDriver();

test.describe('Technical Task', () => {

    test.it('Login user without password', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm(login.email, "");
        helpers.homePage.confirmSingIn(login.email, "");
        helpers.homePage.flashError();
    });

    test.it('Login user without email', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm("", login.password);
        helpers.homePage.confirmSingIn("", login.password);
        helpers.homePage.flashError();
    });

    test.it('Login user without both fields', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm("", "");
        helpers.homePage.confirmSingIn("", "");
        helpers.homePage.flashError();
    });

    test.it('Login user with minimal symbols', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm("1", "1");

    });

    test.it('Login user with maximal symbols', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm("dfsfsdfsdfsdfs@fdsdfasdas.dasdadsadasdasda", "dsadasdasdasdasdasdasdadad");
        helpers.homePage.confirmSingIn("", "dsadasdasdasdasdasdasdadad");
        helpers.homePage.flashError();
    });

    test.it('Sign Up new User', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singUpForm(user.firstName, user.email, user.password);
        helpers.singUpPage.initFirstStep();
        helpers.singUpPage.skipTwoStep();
        helpers.singUpPage.skipThreeStep();
        helpers.singUpPage.chooseFavorite();
        helpers.singUpPage.saveFavorite();
        helpers.singUpPage.finishRating();
        helpers.landingPage.openUserMenu();
        helpers.landingPage.logOut();
        helpers.homePage.init();

    });

    test.it('Login user with correct fields', () => {

        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm(login.email, login.password);
        helpers.landingPage.init();
        helpers.landingPage.searchBooks("Best crime and mystery books");
        helpers.landingPage.markWantToRead(3);
        helpers.landingPage.initMark();
        helpers.landingPage.goToMyBook();
        helpers.landingPage.editBooks();
        helpers.landingPage.goToRead();
        helpers.landingPage.openUserMenu();
        helpers.landingPage.logOut();
        helpers.homePage.init();

    });

    test.it('Clear after test', () => {
        helpers.homePage.load();
        helpers.homePage.init();
        helpers.homePage.singInForm(login.email, login.password);
        helpers.landingPage.init();
        helpers.landingPage.goToMyBook();
        helpers.landingPage.deleteBooks();
        helpers.landingPage.initAfterDelete();
        helpers.landingPage.openUserMenu();
        helpers.landingPage.logOut();
        helpers.homePage.init();

        driver.close();

    });

});