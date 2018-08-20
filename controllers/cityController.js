const { City } = require('../models/index');

const getAllCities = (req, res, next) => {
    City.find()
        .populate('belongs_to')
        .lean()
        .then((cities) => {
            res.status(200).send({ cities });
        })
        .catch(next);
};

const getCityByID = (req, res, next) => {
    City.findById(req.params.city_id)
        .populate('belongs_to')
        .lean()
        .then((city) => {
            res.status(200).send({ city });
        })
        .catch(next);
};

const getCitiesByCountryID = (req, res, next) => {
    City.find({ belongs_to: { _id: req.params.country_id } })
        .populate('belongs_to')
        .lean()
        .then((cities) => {
            res.status(200).send({ cities });
        })
        .catch(next);
};

module.exports = { getAllCities, getCityByID, getCitiesByCountryID };
