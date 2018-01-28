//the location model
//mongoose Schema
const mongoose = require('mongoose')
const geocoder= require('./geocoder')

const locationSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    location: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number],
          index: "2dsphere",
        },
        formattedAddress: String,
    },
})

locationSchema.pre('save', async function(){
    locat = await geocoder.geocode(this.address)
    console.log(locat)
    this.location = {
        type: "Point",
        coordinates: [locat[0].longitude, locat[0].latitude],
        formattedAddress: locat[0].formattedAddress,
      };
})

module.exports = mongoose.model('location', locationSchema)