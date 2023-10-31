const express=require("express")
const requireLogin = require("../middleware/requireLogin")
const Event=require("../models/events")
const User=require("../models/user")
const router=express.Router()

//creating event
router.post("/createEvent",requireLogin,(req,res)=>{
    const {eventname,venue,date,time,organiser,description}=req.body
    if(!eventname || !venue || !date){
           return res.status(422).json({error:"Please Add All Fields"})
    }else{
      const event =new Event({eventname,venue,date,time,organiser:req.user,description})
      event.save()
           .then(result => res.json(result))
    }
        
  })

  //SHOWING ALL POST
  router.get("/allevent",requireLogin,(req,res)=>{
    Event.find()
         .populate("organiser","_id name")
         .then(posts => res.json(posts))
})

//SHOWING MY POST not working
router.get("/myEvent",(req,res)=>{
  Event.find({organiser:req.user._id})
  // .populate("organ"," _id name")
  .then(mypost =>{
      res.json(mypost)
  })
})

// all users
router.get("/alluser",requireLogin,(req,res)=>{
  User.find()
      //  .populate("organiser","_id name")
       .then(posts => res.json(posts))
       
})



  
  module.exports=router