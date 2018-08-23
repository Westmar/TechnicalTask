const utils = require('../utils'),
    by = utils.by,
    driver = utils.initDriver();

let time = 10000;


async function initFirstStep() {

    let progress = driver.findElement(by.className('regProgress'));
    driver.wait(progress, time);

}

async function skipTwoStep() {

    let className = driver.findElements(by.className('actionLink'));
    driver.wait(className, time);
    className.then(collection => collection[2].click());
    
}

async function skipThreeStep() {

    let className = driver.findElement(by.className('actionLink'));
    driver.wait(className, time);
    className.click();

}

async function chooseFavorite() {

    let id = driver.findElement(by.attr('id', 'favorites_Fantasy'));
    driver.wait(id, time);
    id.click();
    
}

async function saveFavorite() {

    let name = driver.findElement(by.name('commit'));
    driver.wait(name, time);
    name.click();

}

async function finishRating() {

    let className = driver.findElement(by.className('actionLink'));
    driver.wait(className, time);
    className.click();
}


module.exports = {

    initFirstStep,
    skipTwoStep,
    skipThreeStep,
    chooseFavorite,
    saveFavorite,
    finishRating
};