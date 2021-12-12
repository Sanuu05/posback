const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const productSchema = mongoose.Schema({
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
    description:{
        type:String,
        required:true

    },
    stock:{
        type:Number,
        required:true,

    },
    costPrice:{
        type:Number,
        required:true,
        
    },
    sellPrice:{
        type:Number,
        required:true,
        
    },
    category:{
        type:String,
        require:true
    },
    tax:{
        type:Number,
        require:true
    },
    barcode:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
})

const Normal = mongoose.model("Product", productSchema)
module.exports = Normal