const Themeparks = require('themeparks')
const schedule = require('node-schedule')
const Ride = require('../models/ride')
const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
const DisneylandPark = new Themeparks.Parks.DisneylandResortMagicKingdom();

//get all the rides from our rides collection
exports.getWaitTimes = (req, res, next)=>{

    Ride.find()
    .then(rides => {
        res.status(200).json({
            message: "rides fetched successfully",
            data: rides
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "error fetching rides"
        })
    })
   
};

//recurring function to get wait times every 30 minutes from the themeparks API
var rule = new schedule.RecurrenceRule();
rule.minute = 30;
var j = schedule.scheduleJob('*/30 * * * *', function(){
    console.log("in scheduler")
    getDisneylandTimes();
    getDisneyworldTimes();

});

//gets waittimes for Disneyland from Themeparks API and adds them to database
function getDisneylandTimes(){

    let rides = [];
    let currentTime = new Date().getTime()

    DisneylandPark.GetWaitTimes().then((rideTimes)=>{
        rideTimes.forEach(ride => {
            let r = new Ride({
                name: ride.name,
                time: ride.waitTime,
                status:ride.status,
                park: "Disneyland",
                date_created: currentTime
            })
            rides.push(r);
        });
        Ride.collection.insertMany(rides, {ordered: false}, function(err, docs){
            if(err){
                return console.log(err)
            }else{
                console.log("rides inserted into db disneyland")
            }
        });
    }).catch((error)=>{
        console.log(error)
    })

}
// TODO 
//get wait times from California Adventure

//gets waittimes for DisneyWorld, adds them to database
function getDisneyworldTimes(){
    let rides = [];
    let currentTime = new Date().getTime()

    DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes)=>{
        rideTimes.forEach(ride => {
            let r = new Ride({
                name: ride.name,
                time: ride.waitTime,
                status:ride.status,
                park: "Disneyworld",
                date_created: currentTime
            })
            rides.push(r);
        });
        Ride.collection.insertMany(rides, {ordered: false}, function(err, docs){
            if(err){
                return console.log(err)
            }else{
                console.log("rides inserted into db disneyworld")
            }
        });
    }).catch((error)=>{
        console.log(error)
    })
}

//TODO
// get wait times for other disney world attractions/parks


