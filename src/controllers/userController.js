const jwt  = require('jsonwebtoken')
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
// var cookie = require('cookie');




//------ register user ------//

exports.signUp = async (req, res,next) => {
    
        const {mobileNumber,name,email,password} = req.body;

        if(!name || !email || !password || !mobileNumber){

            return res.status(400).json({msg:'fill all data,all data is mandatory'})
        }

        try {

        const eValid = await userModel.findOne({email:email})
    
        if(eValid){
            return res.status(401).json({msg:'email is already exist'})
        }
        
         const mValid  = await userModel.findOne({mobileNumber:mobileNumber})
         if(mValid){
            return res.status(401).json({msg:'mobile number is already exist'})
         }

        else{

            const responseData  = new userModel({name,email,password,mobileNumber})
            await responseData.save();

             const token = await responseData.getJwtToken()

            res.status(201).json({ sucess:true, data:responseData ,token})
    
        }

    }

    catch (err) {
        console.log(err);
       res.status(500).json({messge:err.message})
    }
}





//------ login api -------//

exports.login  =  async (req,res)=>{
    
    try{
    
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({message:'Both email and password is mandatory'})
        }
    
        const userLogin  = await userModel.findOne({email:email})

        if(userLogin){
         const  isMatch  = await bcrypt.compare(password, userLogin.password)
       

         
         if(!isMatch){
            return res.status(400).json({error:'invalid login credential'})
         }

         const token = await userLogin.getJwtToken()
         

         return res.status(200).json({sucess:true,msg:'login sucessfully',userLogin,token})

        }
        // else{
        //     return res.status(401).json({error:'invalid login credential'})
        // }
         
         
        
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}



//user profile 


exports.profile = async (req,res) =>{
    
      return res.status(200).send(req.user)

}







//log Out apis

exports.logOut = async (req,res,next) =>{

    try{
          req.user.tokens=[];
          await req.user.save()
    
        
         return res.status(200).json({success:true,message:"logOut Successfully"})

    }catch(err){

         return res.status(500).json(err)
    }
}



//user update api

exports.userUpdate = async (req,res) =>{
try{

    const  data = Object.keys(req.body)

      data.forEach((update) =>{
          req.user[update] = req.body[update]
      })

    await req.user.save()

    return res.status(201).json({message:"user update successfully",data:req.user})

  


   
}catch(error){
    console.log(error);
    return res.status(500).json({message:error.message})
}
    

}

//delete user

exports.deleteUser = async (req,res) =>{
    
    await req.user.remove()
    return res.status(200).send({message:"User Deleted Succesfully"})

}





