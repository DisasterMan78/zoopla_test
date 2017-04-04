(function () {
    'use strict';

    // Import modules
    var http           = require('http'),
        handlebars     = require('handlebars'),
        path           = require('path'),
        fs             = require('fs'),
        express        = require('express'),
        app            = express(),
        exphbs         = require('express-handlebars'),
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

    // GET /search
    app.get('/search', function (request, response) {

        var data = {
            title: 'Zoopla Test: Search',
            requestUrl: request.url
        };

        console.log('Request: ' + request.url);

        response.render('search', data);
    });

    // POST /results
    app.post('/results', function (request, response) {

        var data   = {
            title: 'Zoopla Test: Results',
            requestUrl: request.url
        },
        resultJson = null;

        console.log('Request: ' + request.url);

        readJSONFile('server/data.json', function (error, json) {
            if(error) {
                response.send({ error: 'Not found' });
                throw error;
            }
            console.log('json file found');

            response.setHeader('Content-Type', 'application/json');
            response.send(json);
        });
    });

    app.use(function(request, response, next){
        response.status(404);

        // respond with html page
        if (request.accepts('html')) {
            response.render('404', { url: request.url });
            return;
        }

        // respond with json
        if (request.accepts('json')) {
            response.send({ error: 'Not found' });
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
})();