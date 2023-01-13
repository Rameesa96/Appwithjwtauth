const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User = require('../models/User')
const port = process.env.JWT_SECRET


const RegisterUser =asyncHandler(async(req,res) => {
   const {name,email,password}=req.body
   if(!name || !email || !password){
    res.status(400).send("Please add all fields")
    throw new Error("User already exist")
    
   }
   const Userexist = await User.findOne({email:req.body.email})
   console.log(Userexist)
   if(Userexist){
    res.status(404).send("This email is already registered")
    throw new Error("This email is already registered")
   }

   const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password,salt)
   const user = new User({
    name,
    email,
    password:hashedpassword
})

   try{
    const saveduser = await user.save()
   
        res.status(200).json({
           saveduser,
            token:GenerateJWT(user._id)
    
    })

   }
   
   catch(err){
    res.status(500).json(err.message)
   }}
)


const LoginUser = asyncHandler(async(req,res) => {

    const {email,password}=req.body
try{
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({_id:user._id,
            name:user.name,
            password:user.password,
            email:user.email,
            token:GenerateJWT(user._id)})
    }
}
catch(err){
    res.status(500).json(err.message)
   }
})

//generate jwt 

const GenerateJWT=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
const getme = asyncHandler(async(req,res)=>{
    const{_id,name,email}=await User.findById(req.user.id)
    res.status(200).json({
        _id,
        name,
        email
    })

})
module.exports={RegisterUser,LoginUser,getme}