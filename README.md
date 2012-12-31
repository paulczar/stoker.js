# Stoker.js

## About

A Server/Client app written in node.js to create a pretty interface for the stoker.

Currently uses twitter bootstrap and highcharts to render the interface.

Right now it just displays Basic Temperature Gauges and a Chart showing Temp over time.   needs moar!

## Install & Run

git clone
npm install express
npm install  underscore
./node server.js

then point your browser to http://localhost:3000/dashboard.html?stoker=ip.add.of.stoker

## Currently working on
* save/load device configs.
* tons of API stuff so I can move more functionality to the backend server.

## Todo

* hook up some instrumentation for fans
* build form or method to allow easier input of stoker IP.
* do some funky math to determine if lid has been opened.
* add charting elements to represent target temperatures.
* add way to import/export data to a CSV.
* Allow client to regenerate graphing data from node server.
* Build iframe for actual stoker and allow it to be toggled.
* Allow user to define details about their cook,  i.e. types of meat,  recipes, etc.