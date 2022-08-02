const jwt = require('jsonwebtoken');
const mongoose    = require('mongoose')  
const validator   = require('validator')  
const bcrypt = require('bcrypt')


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
        minLength:[6,'password is greater than 6 char'],
        maxLength:[15,'password is not greater than 15 char'],
        // select:false,
        trim:true
    },

    
},
{timestamps:true});


//hashing password

userSchema.pre('save',async function(next){

    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
    }
    next();
});


module.exports = mongoose.model('user',userSchema)







userSchema.method.getJwtToken = async function(){
    try{
        let token =  jwt.sign({id:this._id},process.env.jwt_SECRET,{
            expiresIn:process.env.JWT_EXPIRE,
        });
        this.tokens  = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        resizeBy.send(err)
    }
}


