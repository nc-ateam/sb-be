const { Landmark } = require('../models/index');

const getAllLandmarks = (req, res, next) => {
    Landmark.find()
        .populate('belongs_to')
        .lean()
        .then((landmarks) => {
            if (landmarks === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ landmarks });
            }
        })
        .catch(next);
};

const getLandmarksByID = (req, res, next) => {
    Landmark.findById(req.params.landmark_id)
        .populate('belongs_to')
        .lean()
        .then((landmark) => {
            if (country === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ landmark });
            }
        })
        .catch(next);
};

const getLandmarksByCity = (req, res, next) => {
    const { city_id } = req.params;

    if (city_id.length !== 12 && city_id.length !== 24) {
        next({ status: 400, message: 'Bad Request' });
    }

    Landmark.find({ belongs_to: { _id: city_id } })
        .populate('belongs_to')
        .lean()
        .then((landmarks) => {
            if (landmarks === null) {
                next({ status: 400, message: 'Bad Request' });
            } else if (landmarks.length === 0) {
                next({ status: 404, message: 'That city does not exist.' });
            } else {
                res.status(200).send({ landmarks });
            }
        })
        .catch(next);
};

module.exports = { getAllLandmarks, getLandmarksByCity, getLandmarksByID };
