const express =require('express')
const router =express.Router()
const {postitem,deleteitem,edititem,getitem,geteachitem}=require('../Controller/item')
const {protect} =require('../middleware/auth')

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

router.post('/',protect,upload,postitem)
router.get('/',protect,getitem)
router.delete('/:id',protect,deleteitem)
router.put('/edit/:id',protect,upload,edititem)
router.get('/:id',protect,geteachitem)




module.exports=router