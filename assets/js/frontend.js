var getResults,
    searchButton = document.getElementById('zoopla-search-form--button__submit');

searchButton.addEventListener('click', function (event){
    var xhr = new XMLHttpRequest();

    event.preventDefault();

    xhr.open('POST', '/results');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);

            var myelement = document.getElementById("zoopla-results");

            myelement.innerHTML= '<div id="zoopla-results--row">We have results!</div>';
        }
        else {
            console.log(xhr.status);
        }
    };
    xhr.send();
}, false);
