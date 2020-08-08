const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
const requirelogin = require('../middleware/requirelogin')


//route to user profile page
router.get('/user/:userid',requirelogin,(req,res)=>{
   
    User.findOne({_id:req.params.userid}).then(user=>{
       
        Post.find({postedBy:req.params.userid}).populate("postedBy","_id name").exec((err,post)=>{
            if(err){
               return res.status(422).json({err:err})
            }
            else{ res.json({user,post})}
        })
    })
})
//follow
router.put('/follow',requirelogin,(req,res)=>{
       User.findByIdAndUpdate(req.body.followId,{
           $push:{followers:[req.user._id]}
        }, 
        {
            new:true
        }
        
        ).exec((err,result1)=>{
           
            if(err){
              return  res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{

                $push:{following:req.body.followId}
            }, {
                new:true
            }
            
            ).then(result=>
                 res.json(result)).catch(err=>{res.json(err)})
        })
})


//unfollow
router.put('/unfollow',requirelogin,(req,res)=>{
       User.findByIdAndUpdate(req.body.unfollowId,{
           $pull:{followers:req.user._id}
        }, 
        {
            new:true
        }
        
        ).exec((err,result)=>{
            if(err){
              return  res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
               
                $pull:{following:req.body.unfollowId}
            }, {
                new:true
            }
            
            ).then(result=>{console.log("p0",result)
                res.json(result)}
                ).catch(err=>{res.json(err)})
        })
})
//update profile pic
router.put('/updatepic',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic},
       
    }, {new:true}).exec((err,result)=>{
        if(err){
            return res.status(422).json({err:err})
        }
        res.json(result)
    })
})


//followers
router.get('/followers',requirelogin,(req,res)=>{
   
 
    User.find().then(person=>{ 
      
        res.json(person)
        console.log(person)
    }).catch(err=>{console.log(err)
       
  })
      
   
   
       
    
   
})

















module.exports = router