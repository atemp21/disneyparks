const Themeparks = require('themeparks')
const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
const DisneylandPark = new Themeparks.Parks.DisneylandResortMagicKingdom();

exports.getWaitTimes = (req, res, next)=>{

    let r;

    DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes)=>{
        r.name = rideTimes.name
    }).catch((error) => {
        console.error(error);
    })

     res.status(200).json({
         message: "Ride Times fetched successfully",
         rides: r,
     })
     .catch(err => {
         res.status(500).json({
             message: "Fetching Rides Failed"
         })
     })
};

