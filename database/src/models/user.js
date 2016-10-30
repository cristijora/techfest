/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id:  {type:String,required:true},
    email: {type:String,required:true},
    username: {type:String,required:true},
    hashedPassword: {type:String,required:true},
    authenticationToken: String,
    createdAt: Date,
    lastLoginAt: Date,
    signInCount: Number,
    custom_data:Schema.Types.Mixed,
    settings:Schema.Types.Mixed,
});

var user=mongoose.model("User",userSchema);
module.exports=user;