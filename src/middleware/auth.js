const jwt  = require('jsonwebtoken')
const userModel = require("../models/userModel")
// const userController = require('../controllers/userController')


exports.isAuth = async function (req, res, next) {
    
  try { 

    const {token} = req.cookie;

    if(!token){
        return res.status(401).json({message:"please login to access the resource"})
    }
     
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // req.userModel = await userModel.findById(decoded)

    next()
    
  }  catch (error) {
      
      res.status(400).send({ status: false, msg: error }) 
    }
  
  }
  