const express = require("express");
const userRouter = express.Router();
const userRepository = require("../modules/users/repository/user_repository");
const routes = require("../helpers/route_consts");
const authChecker = require("../middleware/auth_checker");
const SuperAdminGuard = require("../middleware/super_admin_guard");
userRouter.post(
  routes.userRoutes.signIn,
  //   isAuthenticated,
  userRepository.signIn
);
userRouter.post(routes.userRoutes.signUp, userRepository.signUp);

userRouter.get(
  routes.userRoutes.resetPassword,
  new authChecker().isAuthenticated,
  userRepository.resetPassword
);

userRouter.post(routes.userRoutes.verify, userRepository.verify);

userRouter.get(
  routes.userRoutes.getAllUsers,
  new authChecker().isAuthenticated,
  new SuperAdminGuard().restrictedRoutesGuardian,
  userRepository.getAllUsers
);

userRouter.put(
  routes.userRoutes.controlAccount,
  new authChecker().isAuthenticated,
  new SuperAdminGuard().restrictedRoutesGuardian,
  userRepository.controlAccount
);

module.exports = userRouter;
