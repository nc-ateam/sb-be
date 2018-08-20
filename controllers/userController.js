const { User } = require('../models/index');

const getAllUsers = (req, res, next) => {
    User.find()
        .lean()
        .then((users) => {
            res.status(200).send({ users });
        })
        .catch(next);
};

module.exports = { getAllUsers };
