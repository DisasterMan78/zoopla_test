(function () {
    'use strict';

    // Import modules
    var http           = require('http'),
        httpdispatcher = require('httpdispatcher'),
        dispatcher     = new httpdispatcher(),
        handlebars     = require('handlebars'),
        fs             = require('fs');

    // Define listen port
    const PORT = 8080;

    // Set asset dir
    dispatcher.setStatic('assets');

    // GET /search
    dispatcher.onGet('/search', function (request, response) {

        var data = {
            title: 'Zoopla Test: Search',
            requestUrl: request.url
        };

        console.log('Request: ' + request.url);

        fs.readFile('templates/_search.html', 'utf-8', function(error, source){
            var template = handlebars.compile(source),
                html     = template(data);

            response.writeHead(200, {
                'Content-Type' : 'text/plain',
                'title'        : 'Zoopla Test: Search'
            });
            response.end(html);
        });
    });

    // POST /results
    dispatcher.onPost('/results', function (request, response) {
        console.log('Request: ' + request.url);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(
            '<html><head><title>Zoopla Test: Results</title></head>' +
            '<body>Request: ' + request.url + '</body></html>'
        );
    });

    dispatcher.onError(function (request, response) {
        console.log('No request handler found for ' + request.url);

        response.writeHead(404);
        response.end('<div id="http-error">Requested page not found</div>');
    });

    // Request handler
    function handleRequest(request, response) {
        try {
            // Log request
            console.log(request.url);
            // Disptach
            dispatcher.dispatch(request, response);
        } catch (err) {
            console.log(err);
        }
    }

    // Create server
    var server = http.createServer(handleRequest);

    // Start server
    server.listen(PORT, function () {
        //Callback triggered when server listening.
        console.log('Server listening on: http://localhost:%s', PORT);
    });
})();