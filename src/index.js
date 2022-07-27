        
const express     =    require('express') 
const app  = express();
const bodyparser  = require('body-parser')
const mongoose    = require('mongoose')                    
const router      =    require("./routes/route")

app.use(bodyparser.json())
app.use('/',router)

const DB  = `mongodb+srv://ajaypatel:ajay26898@cluster0.doxg4fp.mongodb.net/ajay11?retryWrites=true&w=majority`
mongoose.connect(DB,{
}).then(() =>
{
    console.log(`connected with mongoDB`);
}).catch((err) => console.log(`mongoDB not Connected`));                   

app.listen(process.env.port || 3000,()=>{
    console.log('connected with port' +(process.env.port || 3000))
});