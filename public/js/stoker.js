$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
      //alert("test - " + hash[0] + " " + hash[1]);
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});


//$(window).load(function () {
  // run code

var INTERVAL = 60000;
var DEBUG = 0;

var UrlVars = $.getUrlVars();

var fetchURL = "/api/stoker/fetch/" + UrlVars["stoker"];

if ("undefined" == typeof(FireStokerJSON)) {
  FireStokerJSON = { "stoker":[], "info":{} };
}

//alert("CHART!");
//demoChart();
  tempGauge = [];
  tempChart = [];
  pageDate = Date.now();
$.getJSON(fetchURL, function(data) {
  FireStokerJSON.stoker.push(data.stoker);
  //document.getElementById('JSON').innerHTML = JSON.stringify(FireStokerJSON);
  var i = 0;
  drawTempChart();
  $.each(data.stoker.sensors, function(key, object) {
    tempGauge[object.id] = object;
    tempChart.arr = [];
    tempChart.arr[object.id] = {};
    tempChart.arr[object.id].pointInterval = 60;
    tempChart.arr[object.id].pointStart = pageDate;
    tempChart.arr[object.id].name = object.name;
    tempChart.arr[object.id].data = [{ x: pageDate, y: object.tc }];

    $("#tempGauges").append("<span id='sensor_"+ object.id +"' class='span12' style='width: 150px; height: 200px; margin: 0 auto' />");
    drawTempGauge(object.id);
    tempChart.chart.addSeries(tempChart.arr[object.id]);
  });
}); 

//$(window).load(function () {
  
//});



setInterval(function(){ 
  var curTime = Date.now();
  $.getJSON(fetchURL, function(data) {
    //alert("JSON Data: " + json.stoker.sensors[0].name);
    FireStokerJSON.stoker.push(data.stoker);
  }); 
  //alert(JSON.stringify(FireStokerJSON));
  //document.getElementById('JSON').innerHTML = JSON.stringify(FireStokerJSON);
  if ( FireStokerJSON.stoker.length > 0 ) {
    $.each(FireStokerJSON.stoker[FireStokerJSON.stoker.length-1].sensors, function(key,object) {
      //alert(object.id);
      point = tempGauge[object.id].gauge.series[0].points[0];
      point.update(Math.floor(object.tc));
      series = tempChart.chart.series[key];
      var x = curTime, // current time
      y = object.tc; // current temperature
      series.addPoint([x, y], true, false);
      //alert(series[0].points[0].y);
      //window.alert("adding " + Date.now() + " " + object.tc); 
    });
  }
}, INTERVAL);

//});


