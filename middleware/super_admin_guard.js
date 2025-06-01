//import routes from './routes';

const Finalizer = require("../utils/finalizer");
const models = require("../models");
const AppConstants = require("../helpers/app_constants");

class SuperAdminGuard {
  constructor() {
    this.restrictedRoutesGuardian = this.restrictedRoutesGuardian.bind(this);
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async restrictedRoutesGuardian(req, res, nxt) {
    let selfFinalizer = new Finalizer();
    try {
      if (req.headers && req.headers.authorization) {
        let _userId = req.secondGuardFlag;
        const isSuperAdminUser = await this.#_isSuperAdmin(_userId);
        if (isSuperAdminUser) {
          req.superSecret = process.env.SUPER_SECRET;
          nxt();
        } else {
          selfFinalizer.failureReq(res, "Restricted routes", 401);
        }
      } else {
        selfFinalizer.failureReq(res, "Try after login", 401);
      }
    } catch (error) {
      selfFinalizer.failureReq(res, "Internal Server Issue", 500);
    }
  }

  /**
   *
   * @param {*} userId
   * @returns {boolean}
   */
  #_isSuperAdmin = async (userId) => {
    let user = await models.User.findOne({ where: { id: userId } });
    return user.userType == AppConstants.userType.super;
  };
}
module.exports = SuperAdminGuard;
