const { Country } = require('../models/index');

const getAllCountries = (req, res, next) => {
    Country.find()
        .lean()
        .then((countries) => {
            res.status(200).send({ countries });
        })
        .catch(next);
};

const getCountryByID = (req, res, next) => {
    Country.findById(req.params.country_id)
        .lean()
        .then((country) => {
            if (country === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ country });
            }
        })
        .catch(next);
};

module.exports = { getAllCountries, getCountryByID };
