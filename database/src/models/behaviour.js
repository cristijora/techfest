/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var behaviourSchema = new Schema({
    id:  {type:String,required:true},
    userId:  {type:String,required:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    createdAt: Date,
});

behaviourSchema.plugin(mongoosePaginate);
var log=mongoose.model("Behaviour",behaviourSchema);
module.exports=log;