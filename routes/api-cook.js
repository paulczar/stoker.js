// API and functions specific to a cook ( not the cooker ).

var default_cook = 
{
    name: "default",
    description: "no description", // description of cook.  e.g.  'Texas style 10lbs brisket'
    device: "default",             // ./config/<device>-device-config.JSON
    status: "not-started",         // not-started, started, paused, finished.
    script: "none",                // unused.   todo allow user to script cooks.
    deviceSettings: {},            // only used to save device settings for historical records.
    deviceOutput: []               // array of device Ouput to allow for rebuild of graphs etc.
}

exports.default_cook = default_cook;

// start cook.   looping with interval to push arrays into cook.deviceOutput.
exports.startCook = function (req,res) { 
  if ( (cook.status == "paused") || (cook.status == "not-started") ) {
    cook.status == "started";
    res.send([{result: "OK"}, cook ]);
  }
}

// start cook.   looping with interval to push arrays into cook.deviceOutput.
exports.pauseCook = function (req,res) {
  cook.status = "paused";
  res.send([{result: "OK"}, cook ]);
}

exports.finishCook = function (req,res) {
  cook.status = "finished";
  res.send([{result: "OK"}, cook ]);
}

exports.saveCook = function (req,res) {

}

exports.loadCook = function (req,res) {

}