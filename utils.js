const path = require('chromedriver').path,
    chrome = require('selenium-webdriver/chrome'),
    config = require('./config'),
    webdriver = require('selenium-webdriver');

let driver=null,
    utils={

        initDriver: function(){
            if(driver) return driver;

            let service = new chrome.ServiceBuilder(path).build();
            chrome.setDefaultService(service);

            let builder = new webdriver.Builder();

            if(config.seleniumServer){
                builder = builder.usingServer(config.seleniumServer + "/wd/hub");
            }

            driver = builder.withCapabilities(webdriver.Capabilities.chrome())
                .build();


            driver.manage().window().maximize();
            driver.manage().deleteAllCookies();
            driver.manage().setTimeouts({script: 30*1000,pageLoad: 30*1000,implicit: 30*1000});

            return driver;
        },

        getRendomNumber: function() {

            return ((new Date()).getTime() + '').substr(6,10);


        },


        userSingIn: function () {

            return {
                email: 'aleksandr.turenk@gmail.com' ,
                password: '1597532684'
            }
        },

        userSingUp: function () {

            return {
                firstName: 'Aleksandr',
                lastName: 'Turenko',
                email: 'aleksandr.turenk+'+this.getRendomNumber()+'@gmail.com' ,
                password: '1597532684'
            }
        },

        by : {

            name : function (name){
                return webdriver.By.name(name)
            },

            className: function (className) {
                return webdriver.By.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " ' + className + ' ")]');
            },


            href : function (href){
                return this.attr("href", href)
            },

            attr : function(attr, value){
                return webdriver.By.xpath("//*[@" + attr + "='" + value + "']");
            },

        }
    };

module.exports=utils;