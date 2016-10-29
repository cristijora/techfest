/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id:  String,
    email: String,
    username: String,
    hashedPassword: String,
    authenticationToken: String,
    createdAt: Date,
    lastLoginAt: Date,
    signInCount: Number,
    custom_data:Schema.Types.Mixed,
    settings:Schema.Types.Mixed,
});

var user=mongoose.model("User",userSchema);
module.exports=user;