const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
name:{
        type:String,
        require:[true,'please add name'],
        
        },
email:{
    type:String,
    require:[true,'please add name'],
    unique:true
},
password:{
    type:String,
    require:[true,'please add name']
}
        
},{timestamps:true})
module.exports = mongoose.model("user",UserSchema)