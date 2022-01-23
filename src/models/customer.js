const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const normalSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    altcode:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    paymentterms:{
        type:String,
        required:true
    },
    creditlimitdays:{
        type:Number,
        required:true
    },
    creditlimit:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    barcode:{
        type:String,
        required:true
    },
    cusstatus:{
        type:String,
        required:true
    },
    
    mobile:{
        type:Number,
        required:true,
        trim:true
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },

})

const Normal = mongoose.model("Customer", normalSchema)
module.exports = Normal