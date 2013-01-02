// API and functions specific to the configuration of the device (Stoker) 

var default_settings = 
{
    Name: "default",
    Host: "192.168.50.140",
    Interval: "60000",
    Cooker: "BGE - Large",
    airportCode: "ATX",
    Type: "stoker",
    plugins: {}
}

exports.display=function(req,res) {
    res.send(deviceSettings);
}

exports.set=function(req,res) {
    if ( req.method == "POST" ) {
      res.send({result: "FAIL - POST not supported yet"});
    } else if ( req.method == "GET") {
      if ( req.params.Name ) {
        deviceSettings.Name = req.params.Name;
      } else if ( req.params.Host ) {
        deviceSettings.Host = req.params.Host;
      } else if ( req.params.Interval ) {
        deviceSettings.Interval = req.params.Interval;
      } else if ( req.params.Cooker ) {
        deviceSettings.Cooker = req.params.Cooker;
      } else if ( req.params.airportCode ) {
        deviceSettings.airportCode = req.params.airportCode;
      } else if ( ( req.params.serial ) && ( req.params.name ) ) {
        if ( "undefined" !=  typeof(deviceSettings.plugins[req.params.serial])) {
          deviceSettings.plugins[req.params.serial].name = req.params.name;
        } else {
          res.send([{result: "FAIL"}, {reason: "No plugin with that serial number found."}]);  
        }
      } else {
        res.send([{result: "FAIL"}, req.params]);
      }
      res.send([{result: "OK"}, deviceSettings ]);
    }
}

exports.save=function(req,res) {
  if ( req.params.name ) {
    // todo input validation!  no prefixed dots or slashes.
    var outputFilename = "./config/" + req.params.name + "-device-config.JSON";
    fs.writeFile(outputFilename, JSON.stringify(deviceSettings,null, 4), function(err) {
      if (err) {
        console.log("error writing to config file: "+ outputFilename +" (" + err + ")");
        res.send([{result: "FAIL"},{reason: err}]);
      } else {
        console.log("saved config file: " + outputFilename);
        res.send([{result: "OK"}]);
      }
    });
  } else {
    res.send([{result: "FAIL"}, {reason: "no filename specified"}]);
  }
}

exports.load=function(req,res) {
  if ( req.params.name ) {
    var inputFilename =  "./config/" + req.params.name + "-device-config.JSON";
    // todo validate contents of JSON file.
    fs.readFile(inputFilename, 'utf8', function (err, data) {
      if (err) {
        console.log("error reading from config file: "+ inputFilename +" (" + err + ")");
        res.send([{result: "FAIL"},{reason: err}]);        
      } else {
        deviceSettings = JSON.parse(data);
        console.log("loaded config file: " + inputFilename);
        res.send([{result: "OK"}, deviceSettings]);
      }
    });
  } else {
    res.send([{result: "FAIL"}, {reason: "no filename specified"}]);
  }
}

exports.default_settings = default_settings;