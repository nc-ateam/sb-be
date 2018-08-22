const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  postNewUser
} = require("../controllers/userController");
const { getPhotosByUserID } = require("../controllers/photoController");

userRouter
  .route("/")
  .get(getAllUsers)
  .post(postNewUser);
userRouter.route("/:user_id").get(getUserByID);
userRouter.route("/:user_id/photos").get(getPhotosByUserID);

module.exports = userRouter;
