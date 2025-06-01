const Finalizer = require("../../../utils/finalizer");
const models = require("../../../models");
const AppConstants = require("../../../helpers/app_constants");
const { log, isDuplicateEmail, isEmpty } = require("../../../utils/utilities");
const { Op } = require("sequelize");
const JWT = require("jsonwebtoken");

class UserService {
  constructor() {
    this.selfFinalizer = new Finalizer();
  }
  signIn(req, res) {
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
          this.selfFinalizer.failureReq(res, "User not registered", 404);
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
      isEnabled: false,
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

  getAllUsers(req, res) {
    models.User.findAll()
      .then((users) => {
        if (isEmpty(users)) {
          return this.selfFinalizer.failureReq(
            res,
            "No registered user yet",
            404
          );
        }
        this.selfFinalizer.successReq(res, users, "Fetched successfully", 200);
      })
      .catch((err) => {
        this.selfFinalizer.failureReq(res, err, 500);
      });
  }
  controlAccount(req, res) {
    const { isEnabled, target } = req.body;
    log(req.body);
    if (isEmpty(isEnabled) || isEmpty(target)) {
      return this.selfFinalizer.failureReq(res, "Bad request", 400);
    }
    models.User.update({ isEnabled: isEnabled }, { where: { id: target } })
      .then((flag) => {
        if (flag == 1) {
          let msg = isEnabled ? "Account activated" : "Account disabled";
          return this.selfFinalizer.successReq(res, flag, msg, 200);
        } else {
          return this.selfFinalizer.failureReq(res, "No user to update", 404);
        }
      })
      .catch((err) => {
        this.selfFinalizer.failureReq(res, err, 500);
      });
  }
}
module.exports = UserService;
