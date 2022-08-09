const mongoose    = require('mongoose')  
const ObjectId = mongoose.Schema.Types.ObjectId



const productSchema = new mongoose.Schema({

    name:{
          type:String,
         required:[true,'product name is required'],
          trim:true
    },

    
    category:{
        type:String,
         required:[true,'product category is required'],
         trim:true
        
    },


    qty:{
        type:Number,
        required:[true,'product quantity is required']
    },


    price:{
        type:Number,
        required:[true,'product price is required']            
    },
  
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user',
    
      },

      image:{
        type:String,
        required:true,
        trim:true
      }

},
{timestamps:true});






module.exports = mongoose.model('products',productSchema)


