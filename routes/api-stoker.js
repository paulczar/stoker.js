// API and functions specific to the Stoker and collecting data from it.

exports.connectStoker = function(req, res) {
  FireStokerJSON.info.hostName = req.params.hostName;
  console.log("hostname set to " + FireStokerJSON.info.hostName)
  res.send([{hostName:FireStokerJSON.info.hostName}]);
}

exports.fetchStokerJSON = function(req,res) {
  if ( FireStokerJSON.info.hostName ) {
    hostName = FireStokerJSON.info.hostName;
  } else if ( req.params.hostName ) {
    hostName = req.params.hostName;
    FireStokerJSON.info.hostName = req.params.hostName;
  } else {
    res.send([{error: "no hostname"}]);
    console.log("no hostname set");
    return;
  }
  var options = {
    host: hostName,
    path: '/stoker.json',
    method: 'GET'
  }
  var jsonData = '';
  var req = http.get(options, function(response) {
    // keep track of the data you receive
    response.on('data', function(json) {
      jsonData += json;
    });

    // finished? ok, write the data to a file
    response.on('end', function() {
      console.log("data collected - " + jsonData);
      var jsObject = JSON.parse(jsonData);
      var Plugins = JSON.parse(jsonData);
      readPlugins(Plugins);
      jsObject.stoker.timestamp = Date.now();
      // Uncomment below if we want to store the full object here.
      FireStokerJSON.stoker.push(jsObject.stoker);  
      res.send(jsObject);
    });

    // Error?
    response.on('error',function(e) {
      console.log("error connecting to stoker: " + e.message);
      res.send([{error:e.message}]);
    });
  });
  req.on('error',function(e) {
    console.log("error connecting to stoker: " + e.message);
    res.send([{error:e.message},FireStokerJSON]);
  });
  console.log("Fetching JSON from: http://" + hostName + "/stoker.json");


}

exports.displayFireStokerJSON = function(req,res) {
  res.send(FireStokerJSON);
}

exports.resetFireStokerJSON = function(req,res) {
  FireStokerJSON = { "stoker":[], "info":{} };
  FireStokerJSON.info.interval = INTERVAL;
  res.send(FireStokerJSON);
}

readPlugins = function(data) {
  //console.log('Reading Plugins: ');
  //console.log("plugins found in config: \n" + util.inspect(deviceSettings.plugins));
  _.each(data.stoker.sensors, function(val, key) {
    if ( "undefined" ==  typeof(deviceSettings.plugins[data.stoker.sensors[key].id]) ) {
      console.log("new sensor (" + data.stoker.sensors[key].id + ") found.  saving it into device object");
      deviceSettings.plugins[data.stoker.sensors[key].id] = {
        name   : data.stoker.sensors[key].name,
        blower : data.stoker.sensors[key].blower,
        type   : "sensors"
      };
    }
  });
  _.each(data.stoker.blowers, function(val, key) {
    if ( "undefined" ==  typeof( deviceSettings.plugins[data.stoker.blowers[key].id]) ) {
      console.log("new blower (" + data.stoker.blowers[key].id + ") found.  saving it into device object");
      deviceSettings.plugins[data.stoker.blowers[key].id] = {
        name : data.stoker.blowers[key].name,
        type : "blowers"
      };
    }
  });
}