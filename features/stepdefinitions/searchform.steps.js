// features/stepdefinitions/routing.steps.js
'use strict';
var expect  = require('chai').expect,
    baseUrl = 'http://localhost:8080/';

module.exports = function () {

    this.World = require('../support/world.js').World;

    this.Then(/^there should be a Zoopla search form$/, function () {
        var selector = 'form[id="zoopla-search-form"]';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector});
    });

    this.Then(/^the form should have a "([^"]+)" field$/, function (name) {
        var selector = 'input[name="' + name + '"]';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector});
    });

    this.Then(/^the form should have a "([^"]+)" button$/, function (type) {
        var selector = 'button[type="' + type + '"]';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector});
    });

    this.Given(/^I submit the search form$/, function () {
        var selector = '#zoopla-search-form--button__submit';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).click();

    });

    this.Then(/^the page should display the results$/, function () {

        var selector = '#zoopla-results #zoopla-results--row';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).getText().then(function (pageText) {
            expect(pageText).to.equal('We have results!');
        });
    });

};
