const { Landmark, Photo, User } = require("../models/index");

const getAllLandmarks = (req, res, next) => {
  Landmark.find()
    .populate("belongs_to")
    .lean()
    .then(landmarks => {
      res.status(200).send({ landmarks });
    })
    .catch(next);
};

const getLandmarksByCity = (req, res, next) => {
  Landmark.find({ belongs_to: { _id: req.params.city_id } })
    .populate("belongs_to")
    .lean()
    .then(landmarks => {
      res.status(200).send({ landmarks });
    })
    .catch(next);
};

const checkAgainstLandmark = (req, res, next) => {
  Landmark.find({ _id: req.params.landmarkId }).then(marker => {
    let radius = marker[0].georadius;
    let string = req.body.body;
    string = string.split("~");
    let result = string[1].split("%2C");
    let userName = string[2].split("jpeg");
    userName = userName[0];
    let numberRes = result.map(item => {
      return parseFloat(item);
    });
    Landmark.find({
      geolocation: { $geoWithin: { $center: [numberRes, radius] } }
    }).then(location => {
      location.forEach(item => {
        if (`${item._id}` === req.params.landmarkId) {
          let postPhoto = {};
          User.find({username: userName}).then(user => {
            postPhoto.belongs_to_user = user[0]._id;
            postPhoto.belongs_to_city = item.belongs_to;
            postPhoto.belongs_to_landmark = item._id;
            postPhoto.firebase_url = req.body.body;
            let newBody = new Photo(postPhoto);
            newBody.save().then(storedPhoto => {
              res.status(201).send({
                  storedPhoto
              })
            });
          })
        }
      });
    });
  });
};

module.exports = { getAllLandmarks, getLandmarksByCity, checkAgainstLandmark };
