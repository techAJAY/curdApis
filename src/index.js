        
const express     =    require('express') 
const app  = express();
const bodyparser  = require('body-parser')
const cookieParser  = require('cookie-parser')
const mongoose    = require('mongoose')                    
const productRouter      =    require("./routes/productRoute")
const userRouter      =    require("./routes/userRoute")
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')


//config

dotenv.config({path:"config/config.env"})

app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use('/',productRouter)
app.use('/',userRouter)
app.use(cookieParser())

connectDatabase();

// const DB  = `mongodb+srv://ajaypatel:ajay26898@cluster0.doxg4fp.mongodb.net/ajay11?retryWrites=true&w=majority`
// mongoose.connect(DB,{
// }).then(() =>
// {
//     console.log(`connected with mongoDB`);
// }).catch((err) => console.log(`mongoDB not Connected`));                   

app.listen(process.env.port || 3000,()=>{
    console.log('connected with port:' +(process.env.port || 3000))
});