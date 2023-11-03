const express=require('express')
const requireLogin = require("../middleware/requireLogin")
const Event=require("../models/events")
const User=require("../models/user")
const router=express.Router()

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
        .select("-password")
        .then(user=>{
            if(user){
                        return res.status(422).json({user})
            }
            })
        })

        // router.get('/myinvites',requireLogin,(req,res)=>{
        //     User.findOne({_id:req.user._id})
        //         .select("-password")
        //         .then(user=>{
        //             if(user){
        //                         const invitations=user.invitations
        //                         for (const invitation of invitations) {
        //                             Event.findOne({_id:invitation})
                                       
        //                                 .then(event=>{
        //                                    if(event){
        //                                    return res.status(422).json({event})
        //                                   }
        //                            })
                                              
        //                         }
                                

                                
        //             }
        //             })
        //         })   
        router.get('/myinvites', requireLogin, (req, res) => {
            User.findOne({ _id: req.user._id })
                .select("-password")
                .then(user => {
                    if (user) {
                        const invitations = user.invitations;
        
                        // Create an array to store event data
                        const eventData = [];
        
                        // Use Promise.all to process all Event queries asynchronously
                        Promise.all(
                            invitations.map(invitation => {
                                return Event.findOne({ _id: invitation })
                                    .then(event => {
                                        if (event) {
                                            eventData.push(event);
                                        }
                                    });
                            })
                        )
                        .then(() => {
                            // Send the eventData as a JSON response after all events have been processed
                            return res.status(200).json({ events: eventData });
                        })
                        .catch(err => {
                            // Handle errors, e.g., by sending an error response
                            return res.status(500).json({ error: err.message });
                        });
                    } else {
                        return res.status(422).json({ message: 'User not found' });
                    }
                })
                .catch(err => {
                    // Handle errors, e.g., by sending an error response
                    return res.status(500).json({ error: err.message });
                });
        });
      
        
       

module.exports=router