// features/stepdefinitions/routing.steps.js
'use strict';
var expect  = require('chai').expect,
    baseUrl = 'http://localhost:8080/';

module.exports = function () {

    this.World = require('../support/world.js').World;


    this.Then(/^I am presented with a "([^"]+)" "([^"]+)"$/, function (type, element) {

        var attribute,
            selector;

        // Expandable to allow any element type to be identified by corresponding attribute
        switch(element) {
            case 'input':
                attribute = 'name';
                break;
            case 'button':
                attribute = 'type';
                break;
        }

        selector = element + '[' + attribute + '="' + type + '"]';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector});
    });


    this.Given(/^I enter "([^"]+)" into "([^"]+)" field$/, function (value, name) {

        var selector = 'input[name="' + name + '"]';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).sendKeys(value);

    });


    this.Then(/^I submit search query$/, function () {

        var selector = '#zoopla-search-form--button__submit';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).click();

    });


    // Checks page content as well as the page slug
    this.Given(/^I am presented with "([^"]+)" page$/, function (name) {

        var selector = '#zoopla-results-container h1',
            path,
            browser = this;

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).then(function () {

            return browser.driver.getCurrentUrl().then(function (path) {

                path = path.replace(baseUrl, '');

                expect(path).to.equal(name);
            });
        });

    });


    this.Then(/^the page shows ordered list of results$/, function () {

        var selector = 'ol#zoopla-search-results',
            browser = this;

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).then(function () {
            var selector = 'li.zoopla-results-item';

            browser.waitFor(selector);

            return browser.driver.findElements({ css: selector}).then(function (elements) {
                expect(elements.length).to.be.above(0);
            });
        });
    });


    this.Then(/^page shows number of results found$/, function () {

        var selector = '#zoopla-results--count';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).getText().then(function (text) {
            expect(text).to.match(/^(\d+) results found$/);
        });

    });


    this.Then(/^each result contains "([^"]+)"$/, function (contentClass) {

        var selector = '.' + contentClass,
            browser = this;

        this.waitFor(selector);

        return this.driver.findElements({ css: selector}).then(function (elements) {

            expect(elements.length).to.equal(5);
        });
    });

};
