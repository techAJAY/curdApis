const userModel = require("../models/userModel")
const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken')


exports.isAuth = async (req, res, next) => {
    
  try { 
  

    const token = req.header('Authorization').replace('Bearer ','')
    
    const decoded = jwt.verify(token, process.env.SECRETKEY)

    const user = await userModel.findOne({_id:decoded._id,'tokens.token':token})

    if(!user){

      //error handel by catch
        throw new Error()
    }
     
    req.token = token
    req.user  =  user
    
    next()
    
  }  catch (error) {
      console.log(error);
      res.status(500).send({ status: false, msg:" User not Authenticate" }) 
    }
  
  }
  