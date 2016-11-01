/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose');

//models
var user = require('./models/user');
var log = require('./models/log');
var mood = require('./models/mood');
var behaviour = require('./models/behaviour');

//utils
var settings = require('./models/settings')
var moodTypes = require('./models/enum/moodTypes')
var eventTypes = require('./models/enum/eventTypes')
var eventFrequency = require('./models/enum/eventFrequency')

var error='';

function connect(connectionString,callback){
    if(!connectionString){
        console.error("Error connecting to db")
        return;
    }
    console.log(connectionString)
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error', function(){
        console.log("error db");
        console.error.bind(console, 'connection error');
        error='database connection error';
        if(callback) callback("connection error",null)

    });
    db.once('open', function() {
        console.log("Connection to mongoose opened");
        if(callback) callback(null,"Successful db connection")
    });
}
function disconnect(){
    mongoose.disconnect();
}
module.exports={
    connect,
    disconnect,
    models:{
      user,
      log,
      mood,
      behaviour
    },
    error:error,
    utils:{
        userDefaultSettings:settings,
        moodTypes,
        eventTypes,
        eventFrequency
    }
};