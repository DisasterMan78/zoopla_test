(function () {
    'use strict';

    // Import modules
    var fs             = require('fs'),
        express        = require('express'),
        app            = express(),
        exphbs         = require('express-handlebars'),
        bodyParser     = require('body-parser'),
        expressOptions = {
            dotfiles   : 'ignore',
            extensions : ['html'],
            index      : false
        };

    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Define listen port
    const PORT = 8080;

    app.set('port', PORT);
    app.use(express.static('assets'));

    app.use(bodyParser.urlencoded({
        extended : true
    }));


    // GET /search
    app.get('/search', function (request, response) {

        var data = {
            title      : 'Zoopla Test: Search',
            requestUrl : request.url
        };

        console.log('Request: ' + request.url);

        response = securityHeaders(response);

        response.render('search', data);
    });


    // GET /results
    app.get('/results', function (request, response) {

        console.log('Get request to /results - redirect to /search');

        response.writeHead(301, { Location : '/search' });
        response.end();
    });


    // POST /results
    app.post('/results', function (request, response) {

        var resultJson = null;

        response.setHeader('Content-Type', 'application/json');
        response = securityHeaders(response);

        if(request.body.search == "N11") {

            console.log('Request: ' + request);

            readJSONFile('server/data.json', function (error, json) {
                if(error) {
                    response.send({ error : 'Not found' });
                    throw error;
                }
                console.log('json file found');
                response.send(json);
            });

        } else {
            response.send({
                area         : request.body.search,
                listing      : [],
                result_count : 0
            });
        }
    });


    app.use(function(request, response, next){
        response.status(404);

        // respond with html page
        if (request.accepts('html')) {
            response.render('404', { url : request.url });
            return;
        }

        // respond with json
        if (request.accepts('json')) {
            response.send({ error : 'Not found' });
            return;
        }

        // default to plain-text. send()
        response.type('txt').send('Not found');
    });


    // Start server
    app.listen(app.get('port'), function () {
        console.log('Hello express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });


    function readJSONFile(filename, callback) {
      fs.readFile(filename, function (err, data) {
        if(err) {
          callback(err);
          return;
        }
        try {
          callback(null, JSON.parse(data));
        } catch(exception) {
          callback(exception);
        }
      });
    }


    function securityHeaders(response){
        response.setHeader('Content-Security-Policy',"script-src 'self'");
        response.setHeader('X-XSS-Protection','1;mode=block');
        response.setHeader('X-Frame-Options','SAMEORIGIN');
        response.setHeader('X-Content-Type-Options','nosniff');
        // HTTPS only
        // ALWAYS ensure HTTPS is working before implementing 'preload'.
        // response.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');

        return response;
    }
})();