const express = require("express");
const userRouter = express.Router();
const userRepository = require("../modules/users/repository/user_repository");
const routes = require("../helpers/route_consts");
const isAuthenticated = require("../middleware/auth_checker");
userRouter.post(
  routes.userRoutes.signIn,
  //   isAuthenticated,
  userRepository.signIn
);
userRouter.post(routes.userRoutes.signUp, userRepository.signUp);
userRouter.get(
  routes.userRoutes.resetPassword,
  isAuthenticated,
  userRepository.resetPassword
); //TODO Add middleware to authenticate user
userRouter.post(routes.userRoutes.verify, userRepository.verify);
module.exports = userRouter;
