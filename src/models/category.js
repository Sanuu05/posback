const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const normalSchema = mongoose.Schema({
    category:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }
    
})

const Normal = mongoose.model("Category", normalSchema)
module.exports = Normal