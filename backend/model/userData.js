
const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    phoneNumber:String,
    address:String,
    profilePicture: { type: String, default: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' },
})
const UserData=mongoose.model('userdetails',userSchema);
module.exports=UserData