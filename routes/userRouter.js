const userRouter = require('express').Router();
const { getAllUsers } = require('../controllers/userController');

userRouter.route('/').get(getAllUsers);

module.exports = userRouter;
