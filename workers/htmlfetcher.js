// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// call our function
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// read is sites.txt 
// for each in sites.txt if file exists DONE
// otherwise, add to download array
// run archive.downloadUrls on the array

console.log(archive.paths.list);
fs.readFile(archive.paths.list, 'utf8', function(err, data) {
  if (err) { console.log(err); }
  else {
    var downloads = data.substr(0, data.length-1).split('\n');
    // check if we already have downloaded
    for (var i = 0; i < downloads.length; i++) {
      archive.isUrlArchived(downloads[i], function(idx, alreadyArchived) {
        if (!alreadyArchived) {
          archive.downloadUrls([downloads[idx]]);
          // handle downloading here
        }
      }.bind(null, i));
    }
  }
});
// right now
// 1) txt not arr
// 2) it has ones we may have already downloaded



// use cron to call me every minute;