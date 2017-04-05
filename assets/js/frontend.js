(function () {
    'use strict';

    var loadFile,
        onResultsReceived,
        onSearchError,
        indexObject,
        addOutPutFilters,
        formatPrice,
        listingsTemplate,
        setSearchVisibility,
        searchButton = document.getElementById('zoopla-search-form--button__submit');


    loadFile = function (file, data, onSuccess, onError, method) {

        var xhr        = new XMLHttpRequest(),
            errorFunc  = onError || function () {},
            loadMethod = method || 'GET';

        xhr.open(loadMethod, file, true);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 1) {
                // Display pending icon
            }

            if (xhr.readyState == 3) {
                // Display loading icon
            }

            if (xhr.readyState == 4) {
                if (xhr.status == '200') {
                    onSuccess(xhr);
                } else {
                    onError(xhr);
                }
            }

        };

        xhr.send(data);

    };


    onResultsReceived = function (xhr) {

        var results,
            container,
            contentType = xhr.getResponseHeader('content-type');

        contentType = contentType.substr(0, contentType.indexOf(';'));

        if(contentType == 'application/json') {
            results = JSON.parse(xhr.response);

            container = document.getElementById('zoopla-results-container');

            if(results.listing.length > 0) {
                setSearchVisibility(false);

                results.listing = indexObject(results.listing);

                results.listing = addOutPutFilters(results.listing);

                window.history.pushState({pageTitle: 'Zoopla Test: Results'},'', '/results');
            } else {
                results.result_count = 'No';
            }

            container.innerHTML = Mustache.render(listingsTemplate, results);

            if(results.result_count == 'No') {
                // This is SO damn lazy, but it fulfils the requirements. I'd rather gouge my eyes out than do this in production
                var count = document.getElementById('zoopla-results--count'),
                    label = document.getElementById('zoopla-search-form--label');

                count.className = 'zoopla-results--count__no-results';
                label.className = 'zoopla-search-form--label__no-results';
                label.innerHTML = 'Enter another location and search again.';
            }

        } else {
            // TODO
console.log('invalid content-type');
        }
    };


    onSearchError = function (xhr) {
        // TODO
console.log(xhr.status);
    };

    searchButton.addEventListener('click', function (event) {

        event.preventDefault();

        var searchValue = document.getElementById('zoopla-search-form--input__search').value;

        loadFile('/results', 'search=' + searchValue, onResultsReceived, onSearchError, 'POST');

    }, false);


    indexObject = function (object) {
        var i;

        for (i = object.length - 1; i >= 0; i--) {
            object[i].index = i;
        }

        return object;
    };


    addOutPutFilters = function (object) {
        var i;

        for (i = object.length - 1; i >= 0; i--) {
            object[i].formatPrice = function() {
                return function(text, render) {
                    return formatPrice(render(text));
                }
            };
        }

        return object;
    };


    formatPrice = function (price) {
        return '£' + parseInt(price, 10).formatMoney(0);
    };


    setSearchVisibility = function (visibility) {
        var searchForm = document.getElementById('zoopla-search-form');
        if(visibility) {
            searchForm.style.display = 'block';
        } else {
            searchForm.style.display = 'none';
        }
    }


    listingsTemplate = `
    <h4 id="zoopla-results--count">{{result_count}} results found</h4>
    <ol id="zoopla-search-results">
        {{#listing}}<li id="results-item-{{index}}" class="zoopla-results-item">
            {{#image_url}}<div class="results-item--image">
                <img class="property-image" src="{{image_url}}" />
            </div>{{/image_url}}
            <div class="results-item--details">
                {{#property_type}}<h3 class="property-title">{{num_bedrooms}} bed {{property_type}} for sale</h3>{{/property_type}}
                {{#price}}<h4 class="property-price">{{#formatPrice}}{{price}}{{/formatPrice}}</h4>{{/price}}
                {{#description}}<p class="property-description">{{description}}</p>{{/description}}
            </div>
            <div class="results-item--agent">
                {{#agent_logo}}<img class="agent-logo" src="{{agent_logo}}" />{{/agent_logo}}
                {{#agent_name}}<h5 class="agent-name">{{agent_name}}</h4>{{/agent_name}}
                {{#agent_address}}<p class="agent-address">{{agent_address}}{{#agent_postcode}}, {{agent_postcode}}{{/agent_postcode}}</p>{{/agent_address}}
                {{#agent_phone}}<p class="agent-phonenumber">T: {{agent_phone}}</p>{{/agent_phone}}
            </div>
        </li>{{/listing}}
    </ol>`;


    Number.prototype.formatMoney = function(decimalPlaces, decimalPoint, thousandSeparator){
        var n = this,
            c = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces,
            d = decimalPoint ||  '.',
            t = thousandSeparator || ',',
            s = n < 0 ? '-' : '',
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
     };
 })();