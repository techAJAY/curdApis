const mongoose    = require('mongoose')  

const productSchema = new mongoose.Schema({

    name:{
          type:String,
          required:[true,'product name is required'],
          trim:true
    },

    category:{
        type:String,
        required:[true,'product category is required']
        
    },
    qty:{
        type:Number,
        required:[true,'product quantity is required']
    },
    price:{
        type:Number,
        required:[true,'product price is required']
    },
},
{timestamps:true});

module.exports = mongoose.model('product',productSchema)


