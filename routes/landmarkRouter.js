const landmarkRouter = require('express').Router();
const {
  getAllLandmarks,
  checkAgainstLandmark
} = require("../controllers/landmarkController");

landmarkRouter.route('/').get(getAllLandmarks);
landmarkRouter.route("/:landmarkId/checkLandmark").post(checkAgainstLandmark);

module.exports = landmarkRouter;
