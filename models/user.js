const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
    ,
    pic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__340.png",

    }

})

mongoose.model("User",userschema)