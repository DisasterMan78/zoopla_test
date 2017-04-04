// features/stepdefinitions/routing.steps.js
'use strict';
var expect  = require('chai').expect,
    baseUrl = 'http://localhost:8080/';

module.exports = function () {

    this.World = require('../support/world.js').World;

    this.Given(/^I enter an invalid path in browser's address bar$/, function () {
        return this.driver.get(baseUrl + 'invalid');
    });

    this.Then(/^the page should display the text "([^"]*)"$/, function (text) {
        this.waitFor('#http-error');

        return this.driver.findElement({ css: '#http-error'}).getText().then(function (pageText) {
            expect(pageText).to.equal(text);
        });
    });

    this.Given(/^I enter "([^"]*)" as the URL path$/, function (path) {
        return this.driver.get(baseUrl + path);
    });

    this.Then(/^the page title should be "([^"]*)"$/, function (text) {
        this.waitFor('title');

        return this.driver.getTitle().then(function (title) {
            expect(title).to.equal(text);
        });
    });

};
