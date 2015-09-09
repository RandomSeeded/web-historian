var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  /* we must handle here
    GET requests to '/', '/validurl', '/invalidurl'
    POST requests to '/'

  */


  res.end(archive.paths.list);
};
