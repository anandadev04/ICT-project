const mongoose=require('mongoose')
const commentSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    userName:{type: String,required: true},
    comments: { type: String, required: true },
});
const commentData=mongoose.model('likes',commentSchema);
module.exports=EventData