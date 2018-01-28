const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/distance_api'
const mongoOptions = {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}

const connectDB = () =>{
    mongoose.connect(mongoUrl, mongoOptions)
    mongoose.connection.once('open',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Database Connected Successfully')
        }
    })
}


module.exports = connectDB;