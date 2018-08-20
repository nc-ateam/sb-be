const cityRouter = require('express').Router();
const { getAllCities, getCityByID } = require('../controllers/cityController');
const { getLandmarksByCity } = require('../controllers/landmarkController');

cityRouter.route('/').get(getAllCities);
cityRouter.route('/:city_id').get(getCityByID);
cityRouter.route('/:city_id/landmarks').get(getLandmarksByCity);

module.exports = cityRouter;
