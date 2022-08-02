const { request } = require('express');
const jwt  = require('jsonwebtoken')
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
var cookie = require('cookie');
const mongoose = require('mongoose');


//------ register user ------//

exports.signUp = async (req, res) => {
    
        const {name,email,password} = req.body;

        if(!name || !email || !password){

            return res.status(400).json({msg:'fill all data,all data is mandatory'})
        }

        try {

        const emailValid = await userModel.findOne({email:email})
    
        if(emailValid){
            return res.status(401).json({msg:'email is already exist'})
        }

        else{

            const responseData  = new userModel({name,email,password})
            await responseData.save();
            res.status(201).json({ sucess:true, data:responseData })
    
        }
        
    }

    catch (err) {
       res.status(500).json({messge:err.message})
    }
}




//------ login api -------//

exports.login  =  async (req,res)=>{
    
    try{
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({message:'email and password is mandatory'})
        }
    
        const userLogin  = await userModel.findOne({email:email})

        if(userLogin){
         const  isMatch  = await bcrypt.compare(password, userLogin.password)
         
         if(!isMatch){
            return res.status(400).json({error:'invalid login credential'})
         }

        else{

            let Id = ({_id:userLogin._id})
            const token = jwt.sign(Id,process.env.SECRET_KEY);


            const storecookie = cookie.serialize('product', (token), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
              });

            res.setHeader('Set-Cookie', storecookie)
           
            
            return res.status(200).json({sucess:true,msg:'login sucessfully',token:token})
    
        }
            
        }
        else{
            return res.status(401).json({error:'invalid login credential'})
        }
         
         
        
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


//log Out apis

exports.logOut = async (req,res,next) =>{

    try{
        console.log("gjyjy");
        res.cookie('product',null, {
            expries: new Date(Date.now()),
            httpOnly:true
        });

         return res.status(200).json({success:true,message:"logOut Successfully"})

    }catch(err){
         res.status(500).json(err)
    }
}