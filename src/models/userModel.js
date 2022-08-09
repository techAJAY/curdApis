const mongoose    = require('mongoose')  
const validator   = require('validator')  
const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({

    name:{
          type:String,
          required:[true,'username is required'],
          trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate:[validator.isEmail,'provide valid email'],
        trim:true
    },

    password:{
        type:String,
        required:[true,'password is required'],
        unique:true,
        //  minLength:[6,'password is greater than 6 char'],
        //  maxLength:[15,'password is not greater than 15 char'],
         trim:true,
        },

        mobileNumber:{
            type:Number,
            required:[true,'mobile numberis required'],
            unique:true
            },
        
   
    tokens:[{
        token:{
            type:String,
            required:true
            },
    }]

    

    
},
{timestamps:true});



// to hide password
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject

}



//hashing password

userSchema.pre('save',async function(next){

    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
    }
    next();
});



//generate token:

userSchema.methods.getJwtToken = async function(){
        try{
            let token =  jwt.sign({_id:this._id.toString()},process.env.SECRETKEY,{
                
                // expiresIn:'1s',
            });
            this.tokens  = this.tokens.concat({token:token})
            await this.save()
            return token
        }catch(err){
            console.log(err);
        }
    }
    
    

module.exports = mongoose.model('user',userSchema)