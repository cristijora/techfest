var express = require('express');
var app = express();
var registerMembershipRoutes =require('./routes/registration');
var initAppPlugins = require('./plugins');
var connect = require('./dbconnect');

var events=require('events');
var util=require('util');

var emitter = new events.EventEmitter();

var db = null;
connect(function (database) {  //connect to the database and emmit events
    db = database;
    emitter.emit("connected")
}, function (err) {
    emitter.emit("connection-failed",err)
});

initAppPlugins(app); //Initialize server start and set access control headers

app.get("/", function (req, res) {
    res.status(200).json("Hello")
});

emitter.on("connected",function(){  //Listen for database connect events
    registerMembershipRoutes(app,db);
});

emitter.on("connection-failed",function(err){
    registerMembershipRoutes(app,db);
    console.log(err);
});




