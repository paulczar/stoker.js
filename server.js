
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
  , path = require('path')
  , api_stoker = require('./routes/api-stoker')
  , view_stoker = require('./routes/view-stoker')

var app = express();

INTERVAL = 60000;

http = require('http');

if ("undefined" == typeof(FireStokerJSON)) {
  FireStokerJSON = { "stoker":[], "info":{} };
  FireStokerJSON.info.interval = INTERVAL;
}

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

app.get('/api/stoker', api_stoker.displayFireStokerJSON);
//app.get('/stoker', function (req,res) {
//  res.send(FireStokerJSON);
//});
app.get('/api/stoker/reset', api_stoker.resetFireStokerJSON);
app.get('/api/stoker/fetch', api_stoker.fetchStokerJSON);
app.get('/api/stoker/set/interval/:interval', function(req,res) {
  FireStokerJSON.info.interval = req.params.interval;
  res.send({interval: req.params.interval});
});
app.get('/api/stoker/fetch/:hostName', api_stoker.fetchStokerJSON);
app.get('/api/stoker/connect/:hostName', api_stoker.connectStoker);

//app.get('/', view_stoker.mainPage);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
