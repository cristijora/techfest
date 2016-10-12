var express = require('express');
var app = express();
require("babel-polyfill");
var request = require('request');
var registerMembershipRoutes =require('./routes/registration');
var initAppPlugins = require('./plugins');
var connect = require('./dbconnect');

var events=require('events');
var util=require('util');

var emitter = new events.EventEmitter();
var db = null;
connect(function (database) {
    db = database;
    emitter.emit("connected")
}, function (err) {
    console.log(err);
    emitter.emit("connection-failed")
});
initAppPlugins(app);


app.listen(5000, function () {
    console.log("stareted on port 5000")
});

app.get("/", function (req, res) {
    res.status(200).json("Hello")
});


emitter.on("connected",function(){
    registerMembershipRoutes(app,db);
});



