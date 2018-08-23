let argv = require('yargs').argv;

let config = {
    goodreadsServer: argv.goodreadsServer || "https://www.goodreads.com/",
    seleniumServer: argv.seleniumServer
};

module.exports = config;