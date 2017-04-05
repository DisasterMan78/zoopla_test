Feature: Users need to be able to search for area by postcode

    # Scenario: Show search form
    #     Given I enter "search" as the URL path
    #     Then there should be a Zoopla search form
    #         And the form should have a "search" field
    #         And the form should have a "submit" button

    # Scenario: Submit search form
    #     Given I submit the search form
    #     Then the page should display the results

    Scenario: Search page is displayed
        # A user's intention can not be tested - only actions
        # Given I want to search for properties on the website
        # When I visit "/search" page
        Given I visit "/search" page
        # Higly inefficient - step would be over-specific and not reusable
        # Then I am presented with a search field and submit button
        Then I am presented with a "search" "input"
            And I am presented with a "submit" "button"

    Scenario: Search for area returns results
        # These are already givens, proven by previous tests
        # Given search page is rendered
        #     And search field is present
        #     And submit button is present
        #
        # Lets make this reusable
        # When I enter "N11" postcode to search field
        Given I enter "N11" into "search" field
            And I submit search query
        # Again, not re-usable
        # Then I am presented with "results" page showing ordered list of results
        Then I am presented with "results" page
            And the page shows ordered list of results
            And page shows number of results found
            And each result contains "property-image"
            And each result contains "property-title"
            And each result contains "property-price"
            And each result contains "property-description"
        #     And each result contains agent data consisting of "agent logo", "agent name", "agent address" and "agent phone number"

    # Scenario: Search for an area for which there are no results
    #     Given search page is rendered
    #         And search field is present
    #         And submit button is present
    #     When I enter "SE1" to search field
    #         And I submit search query
    #     Then search page returns message "No results found"
    #         And search search field is shown
    #         And submit button is shown