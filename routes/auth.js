const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')

const requirelogin = require('../middleware/requirelogin')

router.get('/',(req,res)=>{
    res.send('Wlecome to insra')
})



// signup route
router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body;
    console.log(name,email,password)
    if(!email || !name ||!password){
       return res.status(422).json({error:"Please add all the fields"}) //we dont want to proceeed furthur thatswhy returned******* 422- we understood error but can process forward
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User with this email already registered"})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic   //if key email and value email thrfr can write once also rather than email:email
           }).save().then((user)=>{
               res.json({msg:"user saved successfully"})
               console.log("dooo")
           }).catch((err)=>{
               console.log(err)
           })
        })
        
    }).catch(err=>{
        console.log(err)
    })
})
//login route
router.post('/signin',(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
       return res.status(422).json({error:"please enter email password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
           if(!savedUser){
            return   res.status(422).json({error:"email or password invalid"})
           }
           bcrypt.compare(password,savedUser.password).then(domatch=>{
               if(domatch){
                   //res.json({message:"Signed in successfully"})
                   const token = jwt.sign({id:savedUser._id},JWT_SECRET)//assigned saveduser._id in id new variable
                   const {_id,name,email,following,followers,pic}=savedUser;
                   res.json({token:token,user:{name,_id,email,following,followers,pic}})
                   
               }
               else{
                return res.status(422).json({error:"please enter correct password or email"})
               }
           }).catch(err=>{
               console.log(err)
           })
    })
})



module.exports = router