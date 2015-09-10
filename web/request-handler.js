var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log('Serving '+req.method+" request to "+req.url);

  var localObjs = {
    '/styles.css': '/styles.css',
    '/index.html': '/index.html',
    '/loading.html': '/loading.html'
  }
  //var localPath = __dirname
  //Check if local file if so serve,
  if(req.method === 'GET' && req.url === '/'){
    var filename = __dirname+'/public/index.html';
    helpers.serveAssets(res, filename, 200, function(){
     // console.log('index served');
    });  
  }
  else if(req.method === 'GET' && localObjs[req.url]){
    var filename = __dirname+'/public'+req.url;
    helpers.serveAssets(res, filename, 200, function(){
     // console.log('local served');
    });  
  }
  //if UrlisArchived > serve the page,
  else if (req.method === 'GET') {
    archive.isUrlArchived(req.url, function(exists) {
      if (exists) { 
        helpers.serveAssets(res, archive.paths.archivedSites+"/"+req.url, 200, function() { 
          // console.log('archived served');
        });
      }
      else {
        // if URL is in list but not archived > serve loading
        archive.isUrlInList(req.url, function(exists) {
          if (exists) {
            helpers.serveAssets(res, __dirname+"/public/loading.html", 200, function() {
              // console.log('loading served');
            });
          }
          else {
            // if Url isn'tARchived throw 404 and run the code to add it (could check for validity of server)
            helpers.serveAssets(res, undefined, 404, function() {
              // console.log('throwing 404');
              return 'File does not exists';
            })
          }
        })
      }
    });
  }
  else if (req.method === 'POST' && req.url === '/') {
    // APPEND to sites.txt
    var data ="";
    req.on('data',function(chunk) {
      data+=chunk;
    });
    req.on('end', function(err) {
      if (err) {
        console.log(err);
      }
      // do shit with data
      var suffix = data.replace('url=','');
      archive.addUrlToList(suffix, function(){
        // console.log('writing '+suffix+' to sites.txt');
      });
      helpers.serveAssets(res, undefined, 302, function() {
        // console.log('redirecting to loading page');
        return 'redirecting';
      });
    });
  }

  
  // helpers.serveAssets(res, filename, function(){ console.log('request served');});


  //res.end(archive.paths.list);
};

// 1: trying to axx archived page
// 2: trying to axx indx
// 3: trying to axx css/whatever else
// 4: trying to axx not allowed



