const mongoose=require('mongoose')
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timings: { type: String, required: true },
    days: { type: String, required: true },
    venue: { type: String, required: true },
    picture: { type: String, required: true } 
});
const EventData=mongoose.model('eventdetails',eventSchema);
module.exports=EventData