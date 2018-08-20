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

module.exports = { getAllLandmarks, getLandmarksByCity };
