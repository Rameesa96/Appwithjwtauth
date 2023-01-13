const asyncHandler=require('express-async-handler')
const Item = require('../models/item')



const postitem = asyncHandler(async(req,res)=>{
   const item = new Item ({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    // image: req.file.path
   })
    try{
     const newitem = await item.save()
     res.status(200).json(newitem)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

const edititem = asyncHandler(async(req,res)=>{
   
    try{
      
    const item = await Item.findByIdAndUpdate(req.params.id,{$set:{
     name:req.body.name,
     description:req.body.description,
     price:req.body.price,
    //  image: req.file.path
    }
    },{new:true})
     res.status(200).json(item)
     }
     catch(err){
         res.status(500).json(err.message)
     }
 })

 const  deleteitem = asyncHandler(async(req,res)=>{
    try{
const item =await Item.findByIdAndDelete(req.params.id)
res.status(200).json("deleted")
}
    catch(err){
        res.status(500).json(err.message)
    }
 })

 const  getitem = asyncHandler(async(req,res)=>{
    try{
      
const item =await Item.find()
res.status(200).json(item)
}
    catch(err){
        res.status(500).json(err.message)
    }
 })
 const  geteachitem = asyncHandler(async(req,res)=>{
    try{
const item =await Item.findById(req.params.id)
res.status(200).json(item)
}
    catch(err){
        res.status(500).json(err.message)
    }
 })
module.exports={postitem,edititem,deleteitem,getitem,geteachitem}