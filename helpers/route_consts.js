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
  static loadRoutes = {
    createProjectConfiguration: "/createProjectConfiguration",
    updateProjectConfiguration: "/updateProjectConfiguration",
    deleteProjectConfiguration: "/deleteProjectConfiguration",
    getAllProjectConfigurations: "/getAllProjectConfigurations",
    createProject: "/createProject",
    controlProject: "/controlProject",
    archiveProject: "/archiveProject",
    deleteProject: "/deleteProject",
    getAllProjects: "/getAllProjects",
    finalizeProject: "/finalizeProject",
    createZone: "/createZone",
    controlZone: "/controlZone",
    deleteZone: "/deleteZone",
    deleteAllZones: "/deleteAllZones",
    getAllZones: "/getAllZones",
    createArea: "/createArea",
    controlArea: "/controlArea",
    deleteArea: "/deleteArea",
    deleteAllAreas: "/deleteAllAreas",
    getAllAreas: "/getAllAreas",
  };
};
