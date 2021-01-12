const express = require('express')
const app = express()
const PORT = 5500
const NodeGeocoder = require('node-geocoder');
const path = require('path');
const cors = require('cors')

//app level middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

let dist  = 0

//the geocoder to give longitude and latitude from  address
const options = {
    provider: 'mapquest',

    // Optional depending on the providers
    httpAdapter: 'https',
    apiKey: 'PzwUIZlubKh5osYPD0NqqolWUHUxoUI6', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

//middleware
app.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    try {
        //address from request bosy
        const { address, address2 } = req.body

        //pulling longitude and latitude from geocoder
        const addressInfo = await geocoder.geocode(address)
        const addressInfo2 = await geocoder.geocode(address2)

        if (addressInfo) {
            const lat1 = addressInfo[0].latitude
            const lon1 = addressInfo[0].longitude
            const lat2 = addressInfo2[0].latitude
            const lon2 = addressInfo2[0].longitude

            //the radius of the earth
            const R = 6378100 //is is metres

            //conveting the longitude and latitude to radians
            const la1 = lat1 * Math.PI / 180
            const la2 = lat2 * Math.PI / 180

            // //change in latitude in radians
            const latChange = (lat2 - lat1) * Math.PI / 180;
            const lonChange = (lon2 - lon1) * Math.PI / 180;

            // // calculating a
            const a = Math.sin(latChange / 2) * Math.sin(latChange / 2) + Math.cos(la1) * Math.cos(la2) * Math.sin(lonChange / 2) * Math.sin(lonChange / 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            const distance = R * c
            dist = distance

            res.json({ distance: distance })

        } else {
            res.status(403).json({ error: 'Could not find your address' })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//to render the page
app.get('/', function (req, res) {
    res.status(200).send(dist)
});

//listener
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server up on port ${PORT}`)
    }
})