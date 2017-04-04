Feature: Application needs to provide basic routing and send all other requests to 404 page

    # This scenario can't be logically processed - there is no way for
    # the step to know which path is being tested
    # Scenario: Show not found page
    #     Given I enter a path in browser's address bar
    #         And path is not "/search"
    #         And path is not "/results"
    #     Then "404" page should be returned
    #         And page should display "Requested page not found"

    Scenario: Show not found page
        Given I visit "/invalid" page
        Then the page should display the text "Requested page not found"

    # /results only responds to POST requests
    # GET requests should redirect
    Scenario: Show results page
        Given I visit "/results" page
        Then the page title should be "Zoopla Test: Search"

    Scenario: Show search page
        Given I visit "/search" page
        Then the page title should be "Zoopla Test: Search"

    # This secenario can not be completed without first accessing other features, so will
    # be proven when data is posted from the form
    # Scenario: Show search page
    #     Given I post data to the "results" page
    #     Then the page title should be "Zoopla Test: Results"