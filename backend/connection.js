const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://adevd2004:dYLXF1tayAcZpvRO@cluster0.q3jwt5v.mongodb.net/eventmanagementdb?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
    console.log('DB is connected')
}).catch((res)=>{
    console.log('DB not connected')
})