const landmarkRouter = require('express').Router();
const {
  getAllLandmarks,
  checkAgainstLandmark,
  getLandmarksByID
} = require("../controllers/landmarkController");
landmarkRouter.route("/:landmarkId/checkLandmark").post(checkAgainstLandmark);
landmarkRouter.route('/').get(getAllLandmarks);
landmarkRouter.route('/:landmark_id').get(getLandmarksByID);

module.exports = landmarkRouter;
