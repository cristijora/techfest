/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var logSchema = new Schema({
    id:  String,
    userId:  String,
    email: String,
    entry: String,
    subject: String,
    createdAt: Date,
});

var log=mongoose.model("Log",logSchema);
module.exports=log;