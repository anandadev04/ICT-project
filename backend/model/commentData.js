const mongoose=require('mongoose')
const commentSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    comments: { type: String, required: true } 
});
const CommentData=mongoose.model('comments',commentSchema);
module.exports=CommentData