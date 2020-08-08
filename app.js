const express = require('express');
const app = express()
const PORT = 5000;


//Mongodb connection using mongoosoe
const mongoose = require('mongoose')
const{ MONGOURI }= require('./keys')

mongoose.connect(MONGOURI,{
    useUnifiedTopology: true,useNewUrlParser: true,

})
mongoose.connection.on("connected", ()=>{
    console.log("Connected to mongodb")
})
mongoose.connection.on("error",(error)=>{
    console.log("cant connect to mongo",+ error)
})
  

//Register models
require('./models/user')
require('./models/post')
//to use this model type mmongoose.model(name .model)

//Middleware




//  this is middleware to parse all incoming requests in json format use before routes only
app.use(express.json())



//Register routes
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



app.listen(PORT,console.log(`Server is running on ${PORT}`))













// //app.use(customMiddleware)//common middleware for all routes we can also create seprate as shown in about


// app.get('/',(req,res)=>{
//     res.send("Hello world")
// })
// app.get('/about',customMiddleware,(req,res)=>{
//     res.send("about page")
// })