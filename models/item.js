const mongoose = require('mongoose')
const ItemSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        },

description:{
    type:String
},
price:{
    type:String
},
image: {
    type: String,
    // required: true,
    get: (image) => `${process.env.APP_URL}/${image}`,
  },
        
},
{
    toJSON: { getters: true },
  },{timestamps:true})
module.exports = mongoose.model("items",ItemSchema)