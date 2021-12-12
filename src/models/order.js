const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const productSchema = mongoose.Schema({
    
    order:{
        type:Array,
        require:true

    },
    date:{
        type:String,
        require:true
    }
})

const Orderlist = mongoose.model("Orderlist", productSchema)
module.exports = Orderlist