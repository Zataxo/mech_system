const Finalizer = require("../../../helpers/finalizer");
const bcryptJs = require("bcryptjs");
const models = require("../../../models");
const AppConstants = require("../../../helpers/app_constants");
const mailService = require("../../../utils/email_service");

class UserService {
  constructor() {
    this.selfFinalizer = new Finalizer();
  }
  signIn(req, res) {
    this.selfFinalizer.message = "Hi";
    this.selfFinalizer.code = 200;
    this.selfFinalizer.success = true;
    this.selfFinalizer.data = { result: "Welcome" };
    this.selfFinalizer.finalize(res);
  }
  signUp(req, res) {
    Finalizer.log(req.body);
    const { phoneNo, email } = req.body;
    if (!phoneNo || !email) {
      return this.selfFinalizer.failureReq("Bad request", 401, res);
    } else {
      bcryptJs.genSalt(10, (err, salt) => {
        if (err != null) {
          this.selfFinalizer.failureReq(res, "Salt no generated", 500);
        }
        bcryptJs.hash(phoneNo, salt, (err, hashedPhoneNo) => {
          const userObj = {
            phoneNo: hashedPhoneNo,
            email: email,
            userType: AppConstants.userType.super,
            isVerified: false,
          };
          models.User.create(userObj)
            .then((user) => {
              this.selfFinalizer.successReq(res, user, "User created", 201);
              mailService.sendMail(user.email);
            })
            .catch((err) => {
              this.selfFinalizer.failureReq(res, err, 500);
            });
        });
      });
    }
  }
  resetPassword(req, res) {
    res.send("signIn");
  }
  verify(req, res) {
    res.send("signIn");
  }
}
module.exports = UserService;
