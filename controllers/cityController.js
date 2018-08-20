const { City } = require('../models/index');

const getAllCities = (req, res, next) => {
    City.find()
        .lean()
        .then((cities) => {
            res.status(200).send({ cities });
        })
        .catch(next);
};

module.exports = { getAllCities };
