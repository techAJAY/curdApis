const productModel = require("../models/productModel")
const mongoose  = require('mongoose')

//it check objectid type
const isValidObjectId = function(objectId) {             
    return mongoose.Types.ObjectId.isValid(objectId)
  }





//-------post api---------//


exports.createProduct = async (req, res) => {
    try {
        const requestData = req.body;
        const responseData = await productModel.create(requestData)
        console.log(responseData);
        res.status(201).send({ status: true, msg: "data create succesfully", data: responseData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
}





//-----get api allproduct -----//

// exports.getAllproduct = async (req, res) => {
//     try {
//         const getalldata = await productModel.find()
//         res.status(200).send({ status: true, data: getalldata })
//     }
//     catch (err) {
//         res.status(500).send({ status: false, msg: err })
//     }
// }


exports.getAllproduct = async (req, res) => {
        try {

            if(req.query.category){
                const  filterData = await productModel.find({category:req.query.category})
                if(filterData){
                    res.status(200).send({ data: filterData })
                }
            }
            else{
                const  getalldata = await productModel.find()
                res.status(200).send({ status: true, data: getalldata })
            }
            
            
        }
        catch (err) {
            res.status(500).send({ status: false, msg: err })
        }
    }




//-------get api for single product ---------//


exports.getOneproduct = async (req, res) => {
    try{
        const requestData = req.params.id;
            if(!isValidObjectId(requestData)) {      
              return res.status(400).send({status: false, message: `${requestData} is not a valid user id`})
            
             }
              const responseData = await productModel.findById({ _id: requestData })
              if(responseData){
                return res.status(200).send({ status: true, data:responseData })
              }
              res.status(404).send({ status:false,msg:"product not exist or already deleted"})
            
    
           
    }catch(err){
        return res.status(500).send(err.message)
    }
                 
    }
       
        
            




  
//------- update api -------//

exports.updateProduct = async (req, res) => {
    try {

        const requestData = req.body
        const productId = req.params.id;
        if(!isValidObjectId(productId)) {      
            return res.status(400).send({status: false, message: `${productId} is not a valid user id`})
          
           }
                const responseData = await productModel.findOne({ _id:productId })
                console.log(responseData);
                if(!responseData){
                    res.status(404).send({ status: false, msg:"product not exist or already deleted" })
                    
                }
                
                    const updateData = await productModel.findByIdAndUpdate(responseData, requestData, { new: true })
                    console.log(updateData);
                    res.status(200).send({ status: true, msg: "data update sucessfully",data: updateData })
                
                            
                 
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}







//-------delete api --------//

exports.deleteProduct = async (req, res) => {
    try {
        const requestData = req.params.id;
        if(!isValidObjectId(requestData)) {      
            return res.status(400).send({status: false, message: `${requestData} is not a valid user id`})
          
           }

          const productData =  await productModel.findById(requestData)
          if(!productData){
            return res.status(400).json({ status: false, msg:'product not exist or already deleted' })
          }

          else{
            await productModel.remove(productData)
            return res.status(200).json({ status: true, msg: "product delete sucessfully" }) 
          }
          

    } catch (err) {
        return res.status(500).send(err.message)
    }
}




