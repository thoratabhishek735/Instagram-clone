//Authentication middleware
const jwt = require('jsonwebtoken')
const{JWT_SECRET}= require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports= (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({error:"You must be logged in"})
}
const token = authorization.replace("Bearer ","")
jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
       return res.status(401).json({error:"You must be logged in"})
    }
    const {id}=payload;//this is id we defined while creating jwt token in signin route
    User.findById(id).then(userdata =>{
        req.user = userdata  //if we want to access userdetails we just user request.user
        next() //then block may take some time therfor we are writing next immidiate next to req.user in then block else it gives error 
    })
    
})
}