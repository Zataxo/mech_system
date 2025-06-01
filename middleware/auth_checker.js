const JWT = require("jsonwebtoken");
const Finalizer = require("../utils/finalizer");
const { log } = require("../utils/utilities");

class AuthChecker {
  isAuthenticated = async (req, res, nxt) => {
    let selfFinalizer = new Finalizer();
    try {
      if (req.headers && req.headers.authorization) {
        const _token = req.headers.authorization.split(" ")[1];
        JWT.verify(_token, process.env.JWT_SECRET);
        const _decodedToken = JWT.decode(_token, process.env.JWT_SECRET);
        req.secondGuardFlag = _decodedToken.userId;
        nxt();
      } else {
        selfFinalizer.failureReq(res, "Try after login", 401);
      }
    } catch (error) {
      selfFinalizer.failureReq(res, "Try after login", 401);
    }
  };
}
module.exports = AuthChecker;
