const { Landmark, Photo, User } = require("../models/index");

const getAllLandmarks = (req, res, next) => {
  Landmark.find()
    .populate("belongs_to")
    .lean()
    .then(landmarks => {
      if (landmarks === null) {
        next({ status: 400, message: "Bad Request" });
      } else {
        res.status(200).send({ landmarks });
      }
    })
    .catch(next);
};

const getLandmarksByID = (req, res, next) => {
  Landmark.findById(req.params.landmark_id)
    .populate("belongs_to")
    .lean()
    .then(landmark => {
      if (landmark === null) {
        next({ status: 400, message: "Bad Request" });
      } else {
        res.status(200).send({ landmark });
      }
    })
    .catch(next);
};

const getLandmarksByCity = (req, res, next) => {
  const { city_id } = req.params;

  if (city_id.length !== 12 && city_id.length !== 24) {
    next({ status: 400, message: "Bad Request" });
  } else {
    Landmark.find({ belongs_to: { _id: city_id } })
      .populate("belongs_to")
      .lean()
      .then(landmarks => {
        if (landmarks === null) {
          next({ status: 400, message: "Bad Request" });
        } else if (landmarks.length === 0) {
          next({ status: 404, message: "That city does not exist." });
        } else {
          res.status(200).send({ landmarks });
        }
      })
      .catch(next);
  }
};

const checkAgainstLandmark = (req, res, next) => {
  Landmark.find({ _id: req.params.landmarkId })
    .then(marker => {
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
        if (location.length === 0) {
          res
            .status(400)
            .send({
              message: `Sorry, that photo is not in the vicinty of ${
                marker.landmark
              }`
            });
        }
        location.forEach(item => {
          if (`${item._id}` === req.params.landmarkId) {
            let postPhoto = {};
            User.find({ username: userName }).then(specificUser => {
                if(specificUser.length === 0){
                    res
                      .status(400)
                      .send({
                        message: `User info deprecated`
                      });
                }
              if (specificUser[0].visitedLandmarks.includes(`${item._id}`)) {
                User.update(
                  { username: userName },
                  { $push: { visitedLandmarks: item._id } }
                )
                  .then(response => {
                    User.find({ username: userName }).then(user => {
                      postPhoto.belongs_to_user = user[0]._id;
                      postPhoto.belongs_to_city = item.belongs_to;
                      postPhoto.belongs_to_landmark = item._id;
                      postPhoto.firebase_url = req.body.body;
                      let newBody = new Photo(postPhoto);
                      newBody.save().then(storedPhoto => {
                        res.status(201).send({
                          storedPhoto
                        });
                      });
                    });
                  })
                  .catch(next);
              } else {
                postPhoto.belongs_to_user = specificUser[0]._id;
                postPhoto.belongs_to_city = item.belongs_to;
                postPhoto.belongs_to_landmark = item._id;
                postPhoto.firebase_url = req.body.body;
                let newBody = new Photo(postPhoto);
                newBody.save().then(storedPhoto => {
                  res.status(201).send({
                    storedPhoto
                  });
                });
              }
            });
          }
        });
      });
    })
    .catch(next);
};

module.exports = {
  getAllLandmarks,
  getLandmarksByCity,
  getLandmarksByID,
  checkAgainstLandmark
};
