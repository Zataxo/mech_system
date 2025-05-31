const Finalizer = require("../../../utils/finalizer");
const models = require("../../../models");
const AppConstants = require("../../../helpers/app_constants");
const { log, isDuplicateEmail, isEmpty } = require("../../../utils/utilities");
const { Op } = require("sequelize");
const JWT = require("jsonwebtoken");
// const mailService = require("../../../utils/email_service");

class UserService {
  constructor() {
    this.selfFinalizer = new Finalizer();
  }
  signIn(req, res) {
    log(req.body);
    // if (isEmpty(req.body.phoneNo) && isEmpty(req.body.email)) {
    //   return this.selfFinalizer.failureReq(res, "Bad request", 400);
    // }
    const { phoneNo, email } = req.body;
    if (!phoneNo && !email) {
      return this.selfFinalizer.failureReq(res, "Bad request", 400);
    }
    const signBy = [];
    if (phoneNo) signBy.push({ phoneNo });
    if (email) signBy.push({ email });

    models.User.findOne({
      where: {
        [Op.or]: signBy,
      },
    })
      .then((user) => {
        if (user != null) {
          let payLoad = {
            userId: user.id,
            email: user.email,
          };
          JWT.sign(payLoad, process.env.JWT_SECRET, (err, token) => {
            if (err) {
              return this.selfFinalizer.failureReq(
                res,
                "Token generation failed",
                500
              );
            }
            return this.selfFinalizer.successReq(
              res,
              { user: user, token: token },
              "Successfully signed in",
              200
            );
          });
        } else {
          return this.selfFinalizer.failureReq(res, "User not registered", 404);
        }
      })
      .catch((err) => {
        this.selfFinalizer.failureReq(res, err, 500);
      });
    // this.selfFinalizer.finalize(res);
  }
  async signUp(req, res) {
    const { phoneNo, email } = req.body;
    if (!phoneNo || !email) {
      return this.selfFinalizer.failureReq(res, "Bad request", 400);
    }
    const isEmailDublicated = await isDuplicateEmail(email);
    if (isEmailDublicated) {
      return this.selfFinalizer.failureReq(res, "Duplicated Email", 400);
    }
    const userObj = {
      phoneNo: phoneNo,
      email: email,
      userType: AppConstants.userType.super,
      isVerified: false,
    };

    models.User.create(userObj)
      .then((user) => {
        this.selfFinalizer.successReq(res, user, "User created", 201);
        // mailService.sendMail(user.email); //TODO SETUP oAuth2
      })
      .catch((err) => {
        this.selfFinalizer.failureReq(res, err, 500);
      });
  }
  resetPassword(req, res) {
    res.send("signIn");
  }
  verify(req, res) {
    res.send("signIn");
  }
  getAllUsers() {
    res.send("all users");
  }
}
module.exports = UserService;
