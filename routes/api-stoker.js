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
      jsObject = JSON.parse(jsonData);
      jsObject.stoker.timestamp = Date.now();
      // Uncomment below if we want to store the full object here.
      //FireStokerJSON.stoker.push(jsObject.stoker);  
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