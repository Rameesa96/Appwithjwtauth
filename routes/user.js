const express =require('express')
const router =express.Router()
const {RegisterUser,LoginUser,getme}= require('../Controller/user')
const {protect} =require('../middleware/auth')
router.post('/',RegisterUser)
router.post('/login',LoginUser)
router.get('/',protect,getme)





module.exports=router