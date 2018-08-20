const photoRouter = require('express').Router();
const { getAllPhotos } = require('../controllers/photoController');

photoRouter.route('/').get(getAllPhotos);

module.exports = photoRouter;
