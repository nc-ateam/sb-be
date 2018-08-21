const { Landmark } = require('../models/index');

const getAllLandmarks = (req, res, next) => {
    Landmark.find()
        .populate('belongs_to')
        .lean()
        .then((landmarks) => {
            res.status(200).send({ landmarks });
        })
        .catch(next);
};

const getLandmarksByCity = (req, res, next) => {
    Landmark.find({ belongs_to: { _id: req.params.city_id } })
        .populate('belongs_to')
        .lean()
        .then((landmarks) => {
            res.status(200).send({ landmarks });
        })
        .catch(next);
};

const checkAgainstLandmark = (req, res, next) => {
    Landmark.find({_id : req.params.landmarkId})
    .then(marker => {
    let radius = marker[0].georadius
    let string = req.body.body
    string = string.split("~")
    let result = string[1].split("%2C")
    var userName = string[2].split("jpeg")
    userName = userName[0]
    let numberRes = result.map(item => {
       return parseFloat(item)
    })
    Landmark.find(
        {geolocation: { $geoWithin: { $center : [numberRes, radius]}}}
    )
    .then(location => {
        console.log(location)
        if(`${location[0]._id}` === req.params.landmarkId){
        console.log(location, "<<<<<<<<<<<")
        }
     })
})
}

module.exports = { getAllLandmarks, getLandmarksByCity, checkAgainstLandmark };
