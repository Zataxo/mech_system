const jwt = require("jsonwebtoken");
const { log } = require("../utils/utilities");
const Finalizer = require("../utils/finalizer");

const isAuthenticated = async (req, res, next) => {
  let selfFinalizer = new Finalizer();
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      log(token);
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      selfFinalizer.failureReq(res, "Try after login", 401);
    }
  } catch (error) {
    console.log(error.name);
    console.log(error);
    selfFinalizer.failureReq(res, "Try after login", 401);
  }
};

module.exports = isAuthenticated;
