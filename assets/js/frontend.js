var loadFile,
    searchSuccess,
    searchError,
    showResults,
    templates,
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

}

searchSuccess = function (xhr) {
    var results,
        contentType = xhr.getResponseHeader('content-type');

    contentType = contentType.substr(0, contentType.indexOf(';'));

    window.history.pushState({'pageTitle': 'Zoopla Test: Results'},'', '/results');

    if(contentType == 'application/json') {
        results = JSON.parse(xhr.response);

        showResults(results);
console.log(results);
    } else {
console.log('invalid content-type');
    }
}

searchError = function (xhr) {

}

showResults = function (results) {
    var container = document.getElementById("zoopla-results-container");

    container.innerHTML = Mustache.render(listingsTemplate, results);
}

searchButton.addEventListener('click', function (event) {

    event.preventDefault();

    loadFile('/results', searchSuccess, searchError, 'POST');

}, false);

listingsTemplate = `
<h1>Zoopla Test: Search Results</h1>
<ol id="zoopla-search-results">
    {{#listing}}<li class="zoopla-results-item">Result {{i}}</li>{{/listing}}
</ol>`;