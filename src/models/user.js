const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const normalSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    uid:{
        type:String,
        required:true,
        trim:true,
        
    },
    access1:{
        type:Boolean,
        default:false
    },
    access2:{
        type:Boolean,
        default:false
    },access3:{
        type:Boolean,
        default:false
    },access4:{
        type:Boolean,
        default:false
    },access5:{
        type:Boolean,
        default:false
    },
    approve:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user",
        enum:["admin","user"]
    }
})

const Normal = mongoose.model("User", normalSchema)
module.exports = Normal