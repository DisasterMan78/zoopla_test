// Import modules
var http           = require('http'),
    httpdispatcher = require('httpdispatcher'),
    dispatcher     = new httpdispatcher();

// Define listen port
const PORT = 8080;

// Set asset dir
dispatcher.setStatic('assets');

// GET /search
dispatcher.onGet('/search', function (request, response) {
    'use strict';

    console.log('Request: ' + request.url);

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Request: ' + request.url);
});

// POST /results
dispatcher.onPost('/results', function (request, response) {
    'use strict';

    console.log('Request: ' + request.url);

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Request: ' + request.url);
});

dispatcher.onError(function (request, response) {
    'use strict';

    console.log('No request handler found for ' + request.url);

    response.writeHead(404);
    response.end('Requested page not found');
});

// Request handler
function handleRequest(request, response) {
    'use strict';
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
    'use strict';

    //Callback triggered when server listening.
    console.log('Server listening on: http://localhost:%s', PORT);
});