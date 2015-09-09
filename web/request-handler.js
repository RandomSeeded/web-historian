var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  /* we must handle here
    GET requests to '/', '/validurl', '/invalidurl'

    POST requests to '/'

  */
  console.log('Serving '+req.method+" request to "+req.url);
  var filename = __dirname + req.url;
  if(req.method === 'GET' && req.url === '/') {
    filename = __dirname+'/public/index.html';
  }
  helpers.serveAssets(res, filename, function(){ console.log('request served');});


  //res.end(archive.paths.list);
};
