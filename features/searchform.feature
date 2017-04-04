Feature: Application needs to display search form

    Scenario: Show search form
        Given I enter "search" as the URL path
        Then there should be a Zoopla search form
            And the form should have a "search" field
            And the form should have a "submit" button
