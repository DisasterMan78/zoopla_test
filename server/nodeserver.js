// Import HTTP module
var http = require('http');

// Define listen port
const PORT = 8080;

// Request handler
function handleRequest(request, response) {
    'use strict';

    response.end('Path requested: ' + request.url);
}

// Create server
var server = http.createServer(handleRequest);

// Start server
server.listen(PORT, function () {
    'use strict';

    //Callback triggered when server listening.
    console.log("Server listening on: http://localhost:%s", PORT);
});