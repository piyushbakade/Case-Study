const { application } = require('express');
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

require("./S");
const Flight=mongoose.model("Flight");
 

const dbURI = 'mongodb+srv://piyush_casestudy:mongodb1@cluster0.epahh.mongodb.net/myFourthDatabase';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=>application.listen(1230))
  .catch((err) => console.log(err));
router.post('/user/:Number',(req,res)=>
{
    
    var bookingdata=
    {
        
        Number:req.params.Number,
    }
    var flight=new Flight(bookingdata);
    flight.save().then(()=>
    {
        console.log("New Flight details Entered");
    }).catch((err) => {
        if(err)
        {
            throw err;
        }
    })
    res.send("New Flight details created");
});


router.post("/user",async (req,res)=>
{
    console.log("Hii");
    console.log(req.body);
    var userData=req.body;
    var user=await Flight.findOne({Number:userData.num});
    console.log(user);
    console.log(userData.num);
    if(user)
    {
        if(user.Number==userData.num)
        {
            res.status(200).send({"message":"Success"});
        }
        else 
        {
            res.status(401).send({"message":"Failed"});
        }
    }
    else
    {
        res.status(401).send({"message":"Failed"});
    }
    
})

module.exports=router