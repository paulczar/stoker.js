/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
  , path = require('path')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
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


var fakeStoker = {
  "stoker": {
    "sensors": [
      {"id":"6000001258F74130","name":"Sensor 1","al":0,"ta":225,"th":32,"tl":32,"tc":60,"blower":"6F00000011D4CA05"},
      {"id":"EB00001258EE6730","name":"Sensor 2","al":0,"ta":185,"th":32,"tl":32,"tc":60,"blower":null}
    ],
    "blowers":[
      {"id":"6F00000011D4CA05","name":"Blower 1","on":1}
    ]
  }
}

app.get('/stoker.json', function(req,res) {
  setInterval(function() { 
    var s1 = fakeStoker.stoker.sensors[0];
    var s2 = fakeStoker.stoker.sensors[1];
    var b1 = fakeStoker.stoker.blowers[0];
    if ( s1.tc > s2.tc ) {
      s2.tc += Math.random();
    }
    if ( b1.on ) {
      s1.tc += Math.random() * 10; 
    } else {
      s1.tc -= Math.random() * 10; 
    }
    if ( s1.tc < s1.ta ) {
      b1.on = 1;
    } else {
      b1.on = 0;
    }
    s1.tc = Math.round(s1.tc);
    s2.tc = Math.round(s2.tc);
    res.send(fakeStoker);
}, 1000);
});



// Sudo make me a server.
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
