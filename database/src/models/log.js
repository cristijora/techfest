/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    id:  String,
    userId:  String,
    email: String,
    entry: String,
    subject: String,
    createdAt: Date,
});

logSchema.plugin(mongoosePaginate);
var log=mongoose.model("Log",logSchema);
module.exports=log;