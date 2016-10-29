/**
 * Created by cristian.jora on 28.10.2016.
 */
var user = require('./models/user');
var log = require('./models/log');
var mongoose = require('mongoose');

function connect(connectionString){
    if(!connectionString){
        console.error("Error connecting to db")
        return;
    }
    console.log(connectionString)
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connection to mongoose opened");
    });
}
module.exports={
    connect,
    models:{
      user,
      log
    }
};