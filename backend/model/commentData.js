const mongoose=require('mongoose')
const commentSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    // userName:{type}
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timings: { type: String, required: true },
    days: { type: String, required: true },
    venue: { type: String, required: true },
    likes: { type: Number, required: true},
    picture: { type: String, required: true } 
});
const commentData=mongoose.model('likes',commentSchema);
module.exports=EventData