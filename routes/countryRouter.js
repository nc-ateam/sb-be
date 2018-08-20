const countryRouter = require('express').Router();
const { getAllCountries } = require('../controllers/countryController');

countryRouter.route('/').get(getAllCountries);

module.exports = countryRouter;
