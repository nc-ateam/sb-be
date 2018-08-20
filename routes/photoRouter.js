const photoRouter = require('express').Router();
const {
    getAllPhotos,
    getPhotoByID
} = require('../controllers/photoController');

photoRouter.route('/').get(getAllPhotos);
photoRouter.route('/:photo_id').get(getPhotoByID);

module.exports = photoRouter;
