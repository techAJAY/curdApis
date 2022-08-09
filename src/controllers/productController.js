const productModel = require("../models/productModel")
const mongoose  = require('mongoose')
const { request } = require("express")

//it check objectid type
const isValidObjectId = function(objectId) {             
    return mongoose.Types.ObjectId.isValid(objectId)
  }





//-------post api---------//

 
exports.createProduct = async (req, res) => {
    try {

         const requestData = req.body;
         const imageFile = req.files.image;


         const responseData = await productModel.create({...requestData,userId:req.user._id,image:imageFile})

         cloudinary.uploader.upload(imageFile.ajay, function(result){
            if (result.url) { 
                res.status(200).send({url: result.url});
            }else {
              console.log('Error uploading to cloudinary');
           }
          });

         await responseData.save()

         res.status(201).send({ status: true, msg: "data create succesfully", data: responseData })
    }
    catch (err) {
         console.log(err);
         res.status(500).json({message:err.message})
    }
}






//get api for all product

exports.getAllproduct = async (req, res) => {
        try {
    
            if(req.query.category){
                const  filterData = await productModel.findOne({category:req.query.category,userId:req.user._id})

                if(filterData){
                    res.status(200).send({ data: filterData })
                }
            }
            else{
                const  getalldata = await productModel.findOne({userId:req.user._id})
    
                res.status(200).send({ data: getalldata })
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
              const responseData = await productModel.findOne({ _id:requestData ,userId:req.user._id})
              if(responseData){
                return res.status(200).send({ status: true, data:responseData })
              }
              res.status(404).send({ status:false,msg:"product not exist"})
            
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
                const responseData = await productModel.findOne({ _id:productId,userId:req.user._id})
            
                if(!responseData){
                    return res.status(404).send({ status: false, msg:"product not exist" })
                    
                }
                
                    const updateData = await productModel.findByIdAndUpdate(responseData, requestData, { new: true })
                    await updateData.save()

                    console.log(updateData);
                    return res.status(200).send({ status: true, msg: "data update sucessfully",data: updateData })
                
                            
                 
    }
    catch (err) {
        console.log(err);
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

          const productData =  await productModel.findByIdAndDelete({_id:requestData,userId:req.user._id})
          if(!productData){
            return res.status(400).json({ status: false, msg:'product not exist or already deleted' })
          }

          
            return res.status(200).json({msg: "product deleted sucessfully" }) 
            
    } catch (err) {
        return res.status(500).send(err.message)
    }
}




