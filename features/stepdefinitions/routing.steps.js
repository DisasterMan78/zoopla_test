// features/stepdefinitions/routing.steps.js
'use strict';
var expect  = require('chai').expect,
    baseUrl = 'http://localhost:8080';

module.exports = function () {

    this.World = require('../support/world.js').World;

     // "([^"]*)" is lazy Regex, * matches anything including no string
     // Use + (plus) instead of * (asterisk) to ensure there is one or more character
    this.Given(/^I visit "([^"]+)" page$/, function (path) {

        return this.driver.get(baseUrl + path);

    });


    this.Then(/^the page should display the text "([^"]+)"$/, function (text) {

        var selector = '#http-error';

        this.waitFor(selector);

        return this.driver.findElement({ css: selector}).getText().then(function (pageText) {
            expect(pageText).to.equal(text);
        });
    });


    this.Then(/^the page title should be "([^"]+)"$/, function (text) {

        this.waitFor('title');

        return this.driver.getTitle().then(function (title) {
            expect(title).to.equal(text);
        });
    });

};
