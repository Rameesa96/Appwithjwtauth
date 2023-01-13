const express = require('express')
const mongoose = require("mongoose")
const cors =require('cors')
const bodyParser=require('body-parser')
const app =express()
const itemroute =require('./routes/item')
const Userroute =require('./routes/user')
require("dotenv").config()
const port = process.env.PORT
const connectionstring=process.env.Database_url


mongoose.connect(connectionstring)

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})
mongoose.connection.on("error",()=>{
    console.log("mongodb disconnected")
})
app.get('/',(req,res)=>{
    res.send("server running")
})
app.use("/uploads" , express.static("uploads"))
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/item',itemroute)
app.use("/user",Userroute)
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})