const express = require("express");
const loadRouter = express.Router();
const loadRepository = require("../modules/load/repository/load_repository");
const RouteConstants = require("../helpers/route_consts");
loadRouter.get("/tst", loadRepository.testFinalizer);
loadRouter.post(RouteConstants.loadRoutes.createProjectConfiguration, loadRepository.createProjectConfiguration);
loadRouter.get(RouteConstants.loadRoutes.getAllProjectConfigurations, loadRepository.getAllProjectConfigurations);
loadRouter.post(RouteConstants.loadRoutes.createProject, loadRepository.createProject);
loadRouter.get(RouteConstants.loadRoutes.getAllProjects, loadRepository.getAllProjects);
loadRouter.post(RouteConstants.loadRoutes.createZone, loadRepository.createZone);
loadRouter.post(RouteConstants.loadRoutes.createArea, loadRepository.createArea);





// loadRouter.get("/tst", loadRepository.testFinalizer);
// loadRouter.get("/tst", loadRepository.testFinalizer);

module.exports = loadRouter;
