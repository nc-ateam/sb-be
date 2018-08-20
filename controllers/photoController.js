const { Photo } = require('../models/index');

const getAllPhotos = (req, res, next) => {
    Photo.find()
        .populate('belongs_to_user')
        .populate('belongs_to_city')
        .populate('belongs_to_landmarks')
        .lean()
        .then((photos) => {
            res.status(200).send({ photos });
        })
        .catch(next);
};

const getPhotoByID = (req, res, next) => {
    Photo.findById(req.params.photo_id)
        .populate('belongs_to_user')
        .populate('belongs_to_city')
        .populate('belongs_to_landmarks')
        .lean()
        .then((photo) => {
            res.status(200).send({ photo });
        })
        .catch(next);
};

module.exports = { getAllPhotos, getPhotoByID };
