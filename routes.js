const express = require('express')
const Location = require('./location')
const router = express.Router();

//get request to retreive information from database
//if route is /locaton/api/ and request is get
//then retreve information from database
router.get('/',async(req,res)=>{
    const locations = await Location.find()
    res.json({
        all_location: locations
    })
})

//post request to save information to database
//if route is /location/api and request is post 
//then you van save in database
router.post('/',(req,res)=>{

    const newLocation = new Location(req.body)
    newLocation.save((err)=>{
        if(err){
            res.json({
                message: err.message
            })
        }else{
            res.json({
                location: newLocation
            })
        }
    })
})

module.exports = router;