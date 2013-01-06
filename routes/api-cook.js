// API and functions specific to a cook ( not the cooker ).

var default_cook = 
{
    name: "default",
    description: "no description", // description of cook.  e.g.  'Texas style 10lbs brisket'
    device: "default",             // ./config/<device>-device-config.JSON
    status: "not-started",         // not-started, started, paused, finished.
    script: "none",                // unused.   todo allow user to script cooks.
    deviceSettings: {},            // only used to save device settings for display and historical records.
    deviceOutput: []               // array of device Ouput to allow for rebuild of graphs etc.
}

exports.default_cook = default_cook;

// display cook object
exports.display=function(req,res) {
    session[currentSession].cook.deviceSettings = session[currentSession].deviceSettings;
    res.send(session[currentSession].cook);
}

// start cook.   looping with interval to push arrays into cook.deviceOutput.
exports.start = function (req,res) { 
  if ( (cook.status == "paused") || (cook.status == "not-started") ) {
    cook.status == "started";
    res.send([{result: "OK"}, session[currentSession].cook]);
  } else {
    res.send({result: "FAIL"});
  }
}

// start cook.   looping with interval to push arrays into cook.deviceOutput.
exports.pause = function (req,res) {
  cook.status = "paused";
  res.send([{result: "OK"}, session[currentSession].cook ]);
}

// finish cook.   cannot be restarted ???
exports.finish = function (req,res) {
  cook.status = "finished";
  res.send([{result: "OK"}, session[currentSession].cook ]);
}


// increment cook temperature input array
exports.tick = function (req,res) {

}

// save the whole cook object to a file.
exports.save = function (req,res) {
  if ( req.params.name ) {
    // todo input validation!  no prefixed dots or slashes.
    session[currentSession].cook.deviceSettings = session[currentSession].deviceSettings;
    var outputFilename = "./cooks/" + req.params.name + "-cook.JSON";
    fs.writeFile(outputFilename, JSON.stringify(session[currentSession].cook,null, 4), function(err) {
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

// load a previous cook object from a file.
exports.load = function (req,res) {
  if ( req.params.name ) {
    var inputFilename =  "./cooks/" + req.params.name + "-cook.JSON";
    // todo validate contents of JSON file.
    fs.readFile(inputFilename, 'utf8', function (err, data) {
      if (err) {
        console.log("error reading from config file: "+ inputFilename +" (" + err + ")");
        res.send([{result: "FAIL"},{reason: err}]);        
      } else {
        session[currentSession].cook = JSON.parse(data);
        console.log("loaded config file: " + inputFilename);
        res.send([{result: "OK"}, session[currentSession].cook]);
      }
    });
  } else {
    res.send([{result: "FAIL"}, {reason: "no filename specified"}]);
  }
}