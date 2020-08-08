const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
const requirelogin = require('../middleware/requirelogin')
//get all posts
router.get('/allposts',(req,res)=>{
       Post.find()
       .populate("postedBy").populate("comments.postedby","_id name")
       .then(posts =>{
           res.json({posts})
       }).catch(err=>{
           console.log(err)
       })
})

//get loggein users post
router.get('/myposts',requirelogin,(req,res)=>{
    id1 = req.user._id
  
    Post.find({postedBy:id1}).populate("postedBy","_id name").then(result=>{ console.log(result)
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
})

//route to create post
router.post('/createpost',requirelogin,(req,res)=>{
    const{title , body ,picurl} = req.body
    if(!title || !body || !picurl){
      return  res.status(422).json({error:"please add all fields"})
    }
    console.log(title,body,picurl)
req.user.password=undefined;//to noot show the password
    const post = new Post({
        title,
        body,
        postedBy : req.user,
        photo:picurl
    })
  .save().then(result =>{
        res.json({post:result})
    }).catch(err=>{
        console.log(error)
    })
})
//route to like post
router.put('/like',requirelogin,(req,res)=>{
      Post.findByIdAndUpdate(req.body.postId,{$push:{likes:req.user._id}
      },{
        new:true
    
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
//route to dislike
router.put('/unlike',requirelogin,(req,res)=>{
      Post.findByIdAndUpdate(req.body.postId,{$pull:{likes:req.user._id}
      },{
        new:true
    
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
//route for commenting on post
router.put('/comment',requirelogin,(req,res)=>{
    console.log(req.body.postId)
    const comment = {text:req.body.text,
    postedby:req.user._id}
    console.log(comment)
    Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment}
    },{
      new:true
  
  }).populate("comments.postedby","_id name")
  .exec((err,result)=>{
      if(err){
          console.log("object")
          return res.status(422).json({error:err})
      }
      else{
          res.json(result)
      }
  })
})

//route for deleting post
router.delete('/deletepost/:postId',requirelogin,(req,res)=>{
    console.log(req.params.postId)
      Post.findOne({_id:req.params.postId}).populate("postedBy","_id").exec((err,post)=>{
if(err || !post){res.json({error:err})}
if(post.postedBy._id.toString()===req.user._id.toString()){

post.remove().then(result=>{
    res.json(result)

}).catch(err=>console.log(err))
   
      
}
      })
})














module.exports = router