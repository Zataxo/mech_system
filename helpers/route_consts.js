module.exports = class RouteConstants {
  static baseUrl = "/api/v1";
  static userBaseRoutes = this.baseUrl + "/users";
  static loadBaseRoutes = this.baseUrl + "/load";
  static userRoutes = {
    signIn: "/signIn",
    signUp: "/signUp",
    resetPassword: "/resetPassword",
    verify: "/verify",
    getAllUsers: "/getAllUsers",
    controlAccount: "/controlAccount",
  };
};
