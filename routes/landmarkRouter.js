const landmarkRouter = require('express').Router();
const { getAllLandmarks } = require('../controllers/landmarkController');

landmarkRouter.route('/').get(getAllLandmarks);

module.exports = landmarkRouter;
