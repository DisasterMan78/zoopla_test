(function () {
    'use strict';

    var loadFile,
        searchSuccess,
        searchError,
        showResults,
        templates,
        indexObject,
        addOutPutFilters,
        formatPrice,
        listingsTemplate,
        searchButton = document.getElementById('zoopla-search-form--button__submit');


    loadFile = function (file, onSuccess, onError, method) {

        var xhr        = new XMLHttpRequest(),
            errorFunc  = onError || function () {},
            loadMethod = method || 'GET';

        xhr.open(loadMethod, file, true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 1) {
                // Display pending icon
            }

            if (xhr.readyState == 3) {
                // Display loading icon
            }

            if (xhr.readyState == 4) {
                if (xhr.status == "200") {
                    onSuccess(xhr);
                } else {
                    onError(xhr);
                }
            }

        };

        xhr.send(null);

    };


    searchSuccess = function (xhr) {

        var results,
            contentType = xhr.getResponseHeader('content-type');

        contentType = contentType.substr(0, contentType.indexOf(';'));

        window.history.pushState({pageTitle: 'Zoopla Test: Results'},'', '/results');

        if(contentType == 'application/json') {
            results = JSON.parse(xhr.response);

            results.listing = indexObject(results.listing);

            showResults(results);
console.log(results);
        } else {
console.log('invalid content-type');
        }
    };


    searchError = function (xhr) {

    };


    showResults = function (results) {

        var container = document.getElementById("zoopla-results-container");

        container.innerHTML = Mustache.render(listingsTemplate, results);
    };

    searchButton.addEventListener('click', function (event) {

        event.preventDefault();

        loadFile('/results', searchSuccess, searchError, 'POST');

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
    }


    formatPrice = function (price) {
        return '£' + parseInt(price, 10).formatMoney(0);
    }


    listingsTemplate = `
    <h1>Zoopla Test: Search Results</h1>
    <h4 id="zoopla-results--count">{{result_count}} results found</h4>
    <ol id="zoopla-search-results">
        {{#listing}}<li id="results-item-{{index}}" class="zoopla-results-item">
            {{#image_url}}<div class="results-item--image">
                <img class="property-image" src="{{image_url}}" />
            </div>{{/image_url}}
            <div class="results-item--details">
                {{#property_type}}<h3 class="property-title">{{num_bedrooms}} bed {{property_type}}</h3>{{/property_type}}
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
            d = decimalPoint ||  ".",
            t = thousandSeparator || ",",
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };
 })();