const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    phoneNumber:String,
    address:String
})
const UserData=mongoose.model('userdetails',userSchema);
module.exports=UserData