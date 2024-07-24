const express=require('express');
const cors=require('cors');
const app=new express();
const PORT=4000;
const userModel=require('./model/userData');
require('./connection');
app.use(cors())
app.use(express.json())

app.post('/newuser',async(req,res)=>{
    try{
        var item= req.body;
        const datasave= new userModel(item);
        const saveddata=await datasave.save();
        res.send('Post Successful');
    } catch (error){
        console.log(error)
    }
})

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (user.password !== password) {
        return res.status(401).send('Invalid credentials');
      }
      res.status(200).send('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(PORT,()=>{
    console.log("Server is running on PORT 4000")
})