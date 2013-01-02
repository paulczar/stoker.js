
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
  , path = require('path')
  , api_stoker = require('./routes/api-stoker')
  , api_config = require('./routes/api-config')
  , api_cook = require('./routes/api-cook')

var app = express();

util = require('util');
http = require('http');
fs = require('fs');
_ = require('underscore');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// App starts here ...  define some important objects and variables

if ("undefined" == typeof(deviceSettings)) {
  deviceSettings = api_config.default_settings;
  console.log ("loading default device settings");
}

if ("undefined" == typeof(cook)) {
  cook = api_cook.default_cook;
  console.log("loaded default cook");
}


INTERVAL = deviceSettings.Interval;

if ("undefined" == typeof(FireStokerJSON)) {
  FireStokerJSON = { "stoker":[], "info":{} };
  FireStokerJSON.info.interval = INTERVAL;
}


// Routing for API-Stoker
app.get('/api/stoker', api_stoker.displayFireStokerJSON);
app.get('/api/stoker/reset', api_stoker.resetFireStokerJSON);
app.get('/api/stoker/fetch', api_stoker.fetchStokerJSON);
app.get('/api/stoker/fetch/:hostName', api_stoker.fetchStokerJSON);
app.get('/api/stoker/connect/:hostName', api_stoker.connectStoker);
app.get('/api/stoker/config/interval/:interval', function(req,res) {
  FireStokerJSON.info.interval = req.params.interval;
  res.send({interval: req.params.interval});
});

// Routing for API-Config
app.get('/api/config', api_config.display);
app.post('/api/config/set', api_config.set);
app.get('/api/config/set/plugin/:serial/name/:name', api_config.set);
app.get('/api/config/set/Name/:Name', api_config.set);
app.get('/api/config/set/Host/:Host', api_config.set);
app.get('/api/config/set/Interval/:Interval', api_config.set);
app.get('/api/config/set/Cooker/:Cooker', api_config.set);
app.get('/api/config/set/airportCode/:airportCode', api_config.set);
app.get('/api/config/save/name/:name', api_config.save);
app.get('/api/config/load/name/:name', api_config.load);


// Sudo make me a server.
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
