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
            if (city === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ city });
            }
        })
        .catch(next);
};

const getCitiesByCountryID = (req, res, next) => {
    const { country_id } = req.params;

    if (country_id.length !== 12 && country_id.length !== 24) {
        next({ status: 400, message: 'Bad Request' });
    } else {
        City.find({ belongs_to: { _id: country_id } })
            .populate('belongs_to')
            .lean()
            .then((cities) => {
                if (cities === null) {
                    next({ status: 400, message: 'Bad Request' });
                } else if (cities.length === 0) {
                    next({
                        status: 404,
                        message: 'That country does not exist.'
                    });
                } else {
                    res.status(200).send({ cities });
                }
            })
            .catch(next);
    }
};

module.exports = { getAllCities, getCityByID, getCitiesByCountryID };
