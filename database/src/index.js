/**
 * Created by cristian.jora on 28.10.2016.
 */
var user = require('./models/user');
var log = require('./models/log');
var mongoose = require('mongoose');
var settings = require('./models/settings')
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
      log
    },
    utils:{
        userDefaultSettings:settings
    }
};