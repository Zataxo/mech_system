const express = require("express");
const loadRouter = express.Router();
const loadRepository = require("../modules/load/repository/load_repository");
loadRouter.get("/tst", loadRepository.testFinalizer);
module.exports = loadRouter;
