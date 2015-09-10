//this file should be linked to either basic-server.js or request-handler.js (probably the latter)


var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, code, extendHeaders, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // asset would be the html / whatever file
  // res.end probably goes here
  var extendHeaders = extendHeaders || {};
  console.log('ex:', extendHeaders);
  _.defaults(extendHeaders, headers);
  console.log('h: ', extendHeaders)

  console.log('asset: '+asset);
  var serve = function(asset) {
    console.log('serving');
    if (asset) {
      fs.readFile(asset, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(code, extendHeaders);
          res.end(data);
          callback();
        }
      });
    }
    else {
      // this is now handling both 404 and 302
      res.writeHead(code, extendHeaders);

      res.end(callback());
    }
  };

  serve(asset);

  // ========= LOGIC for checking how to serve files =======
  // if (asset === __dirname+'/public/index.html') {
  //   serve(true);
  // } // somewhere in here we need to do else ifs for css/other files
  // else {
  //   var urlExists = archive.isUrlArchived(asset, serve );
  // }

  // console.log('urlexists: '+urlExists);
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
