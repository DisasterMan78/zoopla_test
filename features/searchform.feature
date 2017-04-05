Feature: Users need to be able to search for area by postcode

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
            # Did someone get bored? These need breaking up
            # And each result contains agent data consisting of "agent logo", "agent name", "agent address" and "agent phone number"
            And each result contains "agent-logo"
            And each result contains "agent-name"
            And each result contains "agent-address"
            And each result contains "agent-phonenumber"

    Scenario: Search for an area for which there are no results
        Given I visit "/search" page
            And I enter "SE1" into "search" field
            And I submit search query
        Then search page returns message "No results found"
            And I am presented with a "search" "input"
            And I am presented with a "submit" "button"