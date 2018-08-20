const { Country } = require('../models/index');

const getAllCountries = (req, res, next) => {
    Country.find()
        .lean()
        .then((countries) => {
            res.status(200).send({ countries });
        })
        .catch(next);
};

module.exports = { getAllCountries };
