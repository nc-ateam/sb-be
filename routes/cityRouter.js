const cityRouter = require('express').Router();
const { getAllCities } = require('../controllers/cityController');

cityRouter.route('/').get(getAllCities);

module.exports = cityRouter;
