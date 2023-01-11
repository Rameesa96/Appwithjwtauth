const express =require('express')
const router =express.Router()
const {postitem,deleteitem,edititem,getitem,geteachitem}=require('../Controller/item')

const fs = require("fs")
const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage:storage
}).single('image')  

router.post('/',upload,postitem)
router.get('/',getitem)
router.delete('/delete',deleteitem)
router.put('/edit/:id',upload,edititem)
router.get('/:id',geteachitem)




module.exports=router