/**
 * Ali Chamas MI9 Test Submission 2015
 */
(function () {
    'use strict';

    // load dependencies, set defaults
    var express = require('express'),
        http = require('http'),
        jsel = require('./jsel.js'),
        app = express(),
        port = process.env.PORT || 80;

    // setup express.js
    app.set('port', port);
    app.set('case sensitive routing', true);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.compress());
    app.use(express.static(__dirname));
    app.use(function(err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }
      res.status(400);
      res.send({ error: 'Could not decode request: JSON parsing failed' });
    });

    /**
     * Main test API service handler
     * Accepts POST JSON where object contains 'payload' property as list
     */
    app.post('/', function (req, res) {
        var json = req.body;

        // filter with "jsel" xpath library - https://github.com/dragonworx/jsel
        //   ~ disclosure: I am also the author :)
        var dom = jsel(json);
        var results = dom.selectAll('//payload/*[@drm and @episodeCount > 0]'); // oh snap!!!
        var array = results.map(function (item) {
            // for each new result object...
            return {
                "image": item.image.showImage, // <- Wha!
                "slug": item.slug,
                "title": item.title
            };
        });

        // send response...
        res.send({"response": array});
    });

    // create express server...
    http.createServer(app).listen(port, function () {
        console.log('  Simple Express Server');
        console.log('-========================-');
        console.log('* [ R U N N I N G . . .] *');
        console.log('http://localhost:' + port);
    });

    // simple url rewrite for default document extension
    app.get('/test', function(req, res) {
        res.sendfile(__dirname + '/test.html');
    });
})();