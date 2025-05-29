const express = require("express");
const userRouter = express.Router();
const userRepository = require("../modules/users/repository/user_repository");
const routes = require("../helpers/route_consts");
userRouter.get(routes.userRoutes.signIn, userRepository.signIn);
userRouter.post(routes.userRoutes.signUp, userRepository.signUp);
userRouter.put(routes.userRoutes.resetPassword, userRepository.resetPassword); //TODO Add middleware to authenticate user
userRouter.post(routes.userRoutes.verify, userRepository.verify);
module.exports = userRouter;
