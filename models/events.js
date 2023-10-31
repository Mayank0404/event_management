const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const eventSchema=new mongoose.Schema({
    eventname:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
   
    description:{
        type:String
    },
    organiser:{
        type:ObjectId,
        ref:'User'
    },
    guestList:[{
        text:String,
        postedBy:{type:ObjectId,ref:'User'}

    }]
    
})

module.exports=mongoose.model('Event',eventSchema)
