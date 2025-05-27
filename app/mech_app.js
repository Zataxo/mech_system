const express = require("express");
const mechApp = express();
const bodyParser = require("body-parser");
const loadRouter = require("../routes/load.routes");
mechApp.use(bodyParser.json());
mechApp.use("/api/test", loadRouter);

module.exports = mechApp;
