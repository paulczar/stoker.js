//Graphing functions

//var chart1; // globally available


function drawTempGauge(id) {
      var object = tempGauge[id];
      var target = tempGauge[id].id;
      tempGauge[id].gauge = new Highcharts.Chart({
      chart: {
          renderTo: "sensor_" + target,
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      
      title: {
          text: tempGauge[id].name
      },
      subtitle: {
          text: "°F"
      },
      
      pane: {
          startAngle: -140,
          endAngle: 140,
          background: [{
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#FFF'],
                      [1, '#333']
                  ]
              },
              borderWidth: 0,
              outerRadius: '109%'
          }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
              borderWidth: 1,
              outerRadius: '107%'
          }, {
              // default background
          }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
      },
         
      // the value axis
      yAxis: {
          min: 0,
          max: 400,
          
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
  
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto'
          },
          title: {
              text: ''
          },
          plotBands: [{
              from: tempGauge[id].ta - 25,
              to: tempGauge[id].ta + 25,
              color: '#55BF3B' // green
          }, {
              from: 0,
              to: tempGauge[id].ta - 25,
              color: '#DDDF0D' // yellow
          }, {
              from: tempGauge[id].ta + 25,
              to: 400,
              color: '#DF5353' // red
          }]        
      },
  
      series: 
      [{
          name: 'Temp',
          data: [ Math.floor(tempGauge[id].tc) ],
          tooltip: {
              valueSuffix: ' °F'
          }
        }]
  
  });
};



function drawTempChart() {
    var chart;
        tempChart.chart = new Highcharts.Chart({
            chart: {
                renderTo: 'tempChart',
                type: 'spline',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'BBQ Temperature',
                x: -20 //center
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Temperature (°F)'
                },
                min: 0,
                max: 400,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +'°F';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: []
//            {
//                pointInterval: tempChart.arr[id].pointInterval,
//                pointStart: tempChart.arr[id].pointStart,
//                name: tempChart.arr[id].name,
//                data: tempChart.arr[id].data
//            }
//            ]
        });
};