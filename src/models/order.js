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
    },
    year:{
        type:String,
        require:true
    },
    month:{
        type:String,
        require:true
    },
    sell:{
        type:Number,
        require:true
    },
    cost:{
        type:Number,
        require:true
        
    },
    income:{
        type:Number,
        require:true
        
    },
    cus:{
        type:Object,
        required:true,
    }
})

const Orderlist = mongoose.model("Orderlist", productSchema)
module.exports = Orderlist