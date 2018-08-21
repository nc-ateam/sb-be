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
            if (photo === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ photo });
            }
        })
        .catch(next);
};

const getPhotosByUserID = (req, res, next) => {
    const { user_id } = req.params;
    if (user_id.length !== 12 && user_id.length !== 24) {
        next({ status: 400, message: 'Bad Request' });
    } else {
        Photo.find({ belongs_to_user: { _id: user_id } })
            .populate('belongs_to_user')
            .populate('belongs_to_city')
            .populate('belongs_to_landmarks')
            .lean()
            .then((photos) => {
                if (photos === null) {
                    next({ status: 400, message: 'Bad Request' });
                } else if (photos.length === 0) {
                    next({
                        status: 404,
                        message:
                            'There are no photos for this user or the user may not exist.'
                    });
                } else {
                    res.status(200).send({ photos });
                }
            })
            .catch(next);
    }
};

module.exports = { getAllPhotos, getPhotoByID, getPhotosByUserID };
