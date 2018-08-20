const cityRouter = require('express').Router();
const { getAllCities, getCityByID } = require('../controllers/cityController');

cityRouter.route('/').get(getAllCities);
cityRouter.route('/:city_id').get(getCityByID);

module.exports = cityRouter;
