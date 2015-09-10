var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var fetcher = require("../workers/htmlfetcher");
var cron = require('cron');


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}



//CRON THAT STUFF
var CronJob = cron.CronJob;
var fetchPages = new CronJob({
  cronTime: '00 * * * * *',
  onTick: fetcher,
  start: true,
  timeZone: "America/Los_Angeles"
});


