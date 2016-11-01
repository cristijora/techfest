/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 28.10.2016.
 */
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var moodSchema = new Schema({
    id:  {type:String,required:true},
    userId:{type:String,required:true},
    mood_type:{type:Number,required:true,min:1,max:5},
    createdAt: Date,
});

moodSchema.plugin(mongoosePaginate);
var user=mongoose.model("Mood",moodSchema);
module.exports=user;