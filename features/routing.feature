Feature: Application needs to provide basic routing and send all other requests to 404 page

    Scenario: Show not found page
        Given I enter "invalid" as the URL path
        Then the page should display the text "Requested page not found"

    Scenario: Show results page
        Given I enter "results" as the URL path
        Then the page should display the text "Requested page not found"

    Scenario: Show search page
        Given I enter "search" as the URL path
        Then the page title should be "Zoopla Test: Search"

    Scenario: Show search page
        Given I post date to the "results" page
        Then the page title should be "Zoopla Test: Results"