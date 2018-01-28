const express = require('express')
const app = express()
const PORT = 5500

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//declaring routes
const locationRoute = require('./routes')
app.use('/location/api', locationRoute)

//middleware
app.use('/',(req,res)=>{
    res.send('Distance Api')
})

//connect database
const connectDB = require('./db')
connectDB();


//listener
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server up on port ${PORT}`)
    }
})