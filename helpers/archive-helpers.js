var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  //should read sites.txt and calls it's callback with an array (of sites to archive)
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      console.log(err);
    } else {
      var dataArray = data.toString().split("\n");
      cb(dataArray);
    }
  });

};

exports.isUrlInList = function(url, cb) {
  //should run its callback with the appropriate string as the param or undefined if it doesn't exist

  //remove preceding "/"
  if (url.charAt(0) === "/") { url = url.substr(1); }
  
  exports.readListOfUrls(function(array){
    var exists = array.reduce(function(memo, element){
      return memo || (element === url);
    }, false);
    console.log(url+' exists: '+exists);
    cb(exists);
  });
};

exports.addUrlToList = function(url, cb) {
  //should add the specified url to sites.txt and takes a callback (run with no params?)
  fs.appendFile(exports.paths.list, url+"\n", function() {
    cb();
  });
};

exports.isUrlArchived = function(url, cb) {
  //should run its callback with the specified url if has already been archived or undefined
  // look for the existence of a file with the specified name (fs.readFile   if we get an error
    // then the file didn't exist)
  var filePath = exports.paths.archivedSites + '/' + url;
  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log('url not archived'+filePath);
      cb(false);
    }
    else {
      console.log('retrieving from archive');
      cb(true);
    }
  })
};

exports.downloadUrls = function(array) {
  //should save the websites in the current list and add the urls to archive.paths.archivedSites which should be an array
  for (var i = 0; i < array.length; i++) {
    // console.log(array[i]);
    http.request({host:array[i]}, archiveSite.bind(this, array[i])).end();
  }

  function archiveSite(hostName, response) {
    console.log('hostName is '+hostName);
    var data = "";
    response.on('data', function(chunk) {
      data+=chunk;
    });
    response.on('end', function(err) {
      if (err) { console.log(err); }
      else {
        fs.writeFile(exports.paths.archivedSites + '/' + hostName, data, function(err){
          if(err){
            console.log('failing bodaciously');
          }
          else{
            console.log('writing to disk'); 
          }
        });
      }
    });
  }
};
