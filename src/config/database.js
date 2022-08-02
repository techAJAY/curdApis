const mongoose = require('mongoose')

  const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URI,{
    }).then(() =>
    {
        console.log(`connected with mongoDB`);
    }).catch((err) => console.log(`mongoDB not Connected`)); 
    
  } 

  module.exports = connectDatabase


