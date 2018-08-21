const landmarkRouter = require('express').Router();
const {
    getAllLandmarks,
    getLandmarksByID
} = require('../controllers/landmarkController');

landmarkRouter.route('/').get(getAllLandmarks);
landmarkRouter.route('/:landmark_id').get(getLandmarksByID);

module.exports = landmarkRouter;
