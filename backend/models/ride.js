const mongoose = require("mongoose")

const rideSchema = mongoose.Schema({
    name: {type: String}, 
    time: {type: Number},
    status: {type: String},
    park: {type:String},
    date_created: {type: Date}

})
module.exports = mongoose.model("Ride", rideSchema)