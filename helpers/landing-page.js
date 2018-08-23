const utils = require('../utils'),
    by = utils.by,
    chai = require('chai'),
    driver = utils.initDriver(),
    webdriver = require('selenium-webdriver'),
    should = chai.should();

let time = 10000;

async function init() {

    let logo = driver.findElement(by.className('siteHeader__logo siteHeader__logo--doodle'));
    driver.wait(logo, time);

}

async function searchBooks(text) {

    let name = driver.findElement(by.name('q'));
    driver.wait(name, time);
    name.sendKeys(text);
    name.sendKeys(webdriver.Key.ENTER);
    // driver.sleep(5000);

}

async function markWantToRead(number) {

    for (let i = 0; i < number; i++) {
        driver.sleep(200);
        driver.wait(driver.findElement(by.className('wtrToRead')).click(), time);
        driver.sleep(1800);
    }

}

async function initMark() {

    driver.sleep(3000);
    let className = driver.findElements(by.className('wtrStatusToRead wtrUnshelve'));
    driver.wait(className, time);
    className.then(found => {
        if (found.length === 1) {
            let founds = found.length;
            founds.should.be.equal(3);
        } else {
            let founds = found.length;
            founds.should.be.equal(3);
        }
    });

}

async function goToMyBook() {

    let href = driver.findElement(by.href("/review/list/85697908"));
    driver.wait(href, time);
    href.click();
}


async function changeMarkToRead() {

    driver.sleep(1000);
    let className = driver.findElements(by.className('actionLinkLite chooseShelvesLink'));
    driver.wait(className, time);
    className.then(collection => collection[1].click());
}

async function chooseMarkToRead() {

    let className = driver.findElements(by.className('visible exclusive hover'));
    driver.wait(className, time);
    className.then(collection => collection[1].click());

}

async function writeReview(textReview) {

    let name = driver.findElement(by.name('review[review]'));
    driver.wait(name, time);
    name.click();
    name.sendKeys(textReview)
}

async function dataStartRead(number) {

    let today = driver.findElement(by.className('startedAtSetTodayLink gr-button'));
    driver.wait(today, time);
    today.click();
    let changeDay = driver.findElement(by.className('rereadDatePicker smallPicker startDay'));
    driver.wait(changeDay, time);
    changeDay.sendKeys(number);

}

async function dataEndRead(number) {

    let today = driver.findElement(by.className('endedAtSetTodayLink gr-button'));
    driver.wait(today, time);
    today.click();
    let changeDay = driver.findElement(by.className('rereadDatePicker smallPicker endDay'));
    driver.wait(changeDay, time);
    changeDay.sendKeys(number);

}

async function savePreview() {

    let next = driver.findElement(by.name('next'));
    driver.wait(next, time);
    next.click();
}

async function editBook(number) {

    let className = driver.findElements(by.attr('class', 'actionLinkLite editLink'));
    driver.wait(className, time);
    className.then(collection => collection[number].click());
}


async function myRating() {

    let rating = driver.findElements(by.attr('title','really liked it'));
    driver.wait(rating, time);
    rating.then(collection => collection[3].click());
    
}
async function editBooks() {


    let review = driver.findElements(by.attr('class', 'bookalike review'));
    driver.wait(review, time);
    await review.then(collection =>  {
        for (let i = 0; i < collection.length; i++) {
            driver.sleep(500);
            this.editBook(i);
            this.changeMarkToRead();
            this.chooseMarkToRead();
            this.myRating();
            this.writeReview('Text Test Review ' + i + ' books ');
            this.dataStartRead(i+10);
            this.dataEndRead(i+19);
            this.savePreview();
            driver.sleep(1500);
        }

    });
}


async function goToRead() {

    driver.sleep(1000);
    driver.executeScript('window.scrollTo(0,0)');
    let className = driver.findElements(by.attr('class', 'actionLinkLite'));
    driver.wait(className, time);
    className.then(collection => collection[0].click());

}

async function openUserMenu() {

    let className = driver.findElement(by.className('dropdown dropdown--profileMenu'));
    driver.wait(className, time);
    className.click();
}

async function logOut() {

    driver.sleep(500);
    let href = driver.findElements(by.href('/user/sign_out'));
    driver.wait(href, time);
    href.then(collection => collection[0].click());
    driver.sleep(500);
    let className = driver.findElement(by.className('actionLink large'));
    driver.wait(className, time);
    className.click();
    driver.sleep(1000);
}

async function deleteBooks(){

    let className = driver.findElements(by.className('actionLinkLite smallText deleteLink'));
    driver.wait(className, time);
    className.then(collection => {
        for (let i = 0; i < collection.length; i++) {
    let click = driver.findElement(by.className('actionLinkLite smallText deleteLink'));
            driver.wait(click, time);
            click.click();
            driver.sleep(200);
            driver.switchTo().alert().accept();//.sendKeys(webdriver.Key.ENTER);
            driver.sleep(2000);
        }
    });
}


async function initAfterDelete() {

    driver.sleep(3000);
    let className = driver.findElement(by.className('greyText nocontent stacked'));
    driver.wait(className, time);
}
module.exports = {

    init,
    searchBooks,
    markWantToRead,
    initMark,
    goToMyBook,
    editBook,
    editBooks,
    changeMarkToRead,
    chooseMarkToRead,
    writeReview,
    dataStartRead,
    dataEndRead,
    savePreview,
    goToRead,
    myRating,
    openUserMenu,
    logOut,
    deleteBooks,
    initAfterDelete

};