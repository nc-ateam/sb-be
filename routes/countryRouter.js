const countryRouter = require('express').Router();
const {
    getAllCountries,
    getCountryByID
} = require('../controllers/countryController');
const { getCitiesByCountryID } = require('../controllers/cityController');

countryRouter.route('/').get(getAllCountries);
countryRouter.route('/:country_id').get(getCountryByID);
countryRouter.route('/:country_id/cities').get(getCitiesByCountryID);

module.exports = countryRouter;
