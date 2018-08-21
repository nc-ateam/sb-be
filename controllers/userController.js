const { User } = require('../models/index');

const getAllUsers = (req, res, next) => {
    User.find()
        .lean()
        .then((users) => {
            res.status(200).send({ users });
        })
        .catch(next);
};

const getUserByID = (req, res, next) => {
    User.findById(req.params.user_id)
        .lean()
        .then((user) => {
            if (user === null) {
                next({ status: 400, message: 'Bad Request' });
            } else {
                res.status(200).send({ user });
            }
        })
        .catch(next);
};

module.exports = { getAllUsers, getUserByID };
