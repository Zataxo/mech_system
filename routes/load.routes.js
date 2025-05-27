const express = require("express");
const loadRouter = express.Router();
const loadRepository = require("../modules/load/repository/load_repository");
// licenseRouter.post("/validate", licenseController.validateLicense);
// licenseRouter.post("/generate", licenseController.generateNewLicense);
loadRouter.get("/tst", loadRepository.testFunc);
module.exports = loadRouter;
