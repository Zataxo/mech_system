const Finalizer = require("../../../utils/finalizer");
const models = require("../../../models");
const AppConstants = require("../../../helpers/app_constants");
const {log, isDuplicateEmail, isEmpty, isUserExists} = require("../../../utils/utilities");
const {Op} = require("sequelize");
const JWT = require("jsonwebtoken");
const {sendMail} = require("../../../utils/email_service");
const Utils = require("../../../utils/utilities");
const bcryptJs = require("bcryptjs");

class UserService {
    constructor() {
        this.selfFinalizer = new Finalizer();
    }


    signIn(req, res) {
        const {phoneNo, email} = req.body;
        if (!phoneNo && !email) {
            return this.selfFinalizer.failureReq(res, "Bad request", 400);
        }
        const signBy = [];
        if (phoneNo) signBy.push({phoneNo});
        if (email) signBy.push({email});

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
                            {user: user, token: token},
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
    }

    async signUp(req, res) {
        const {phoneNo, email} = req.body;

        if (isEmpty(phoneNo) || isEmpty(email)) {
            return this.selfFinalizer.failureReq(res, "Bad request: missing phone or email", 400);
        }

        try {
            const isEmailDuplicated = await isDuplicateEmail(email);
            if (isEmailDuplicated) {
                return this.selfFinalizer.failureReq(res, "Duplicated Email", 400);
            }

            const otp = new Utils().generateOtp();
            const otpHashed = await bcryptJs.hash(otp, 10);


            const userObj = {
                phoneNo,
                email,
                userType: AppConstants.userType.normal,
                otp: otpHashed,
                otpUsed: false,
                isVerified: false,
                isEnabled: false
            };

            const user = await models.User.create(userObj);

            sendMail(email, AppConstants.emailType.otpVerification, otp);

            this.selfFinalizer.successReq(res, user, "User created. OTP sent to email.", 201);

        } catch (err) {
            this.selfFinalizer.failureReq(res, err, 500);
        }
    }

    resetPassword(req, res) {
        res.send("signIn");
    }

    async verify(req, res) {
        const {userId, otp} = req.body;
        if (isEmpty(userId) || isEmpty(otp)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }

        models.User.findOne({where: {id: userId}}).then(async (user) => {
            if (user == null) {
                return this.selfFinalizer.failureReq(res, "No user associated with this ID", 400);
            }
            if (user.otpUsed) {
                return this.selfFinalizer.failureReq(res, "OTP has already been used", 400);
            }
            let isOtpMatch = await bcryptJs.compare(otp, user.otp);
            if (!isOtpMatch) {
                return this.selfFinalizer.failureReq(res, "Invalid otp", 400);
            }
            sendMail(user.email, AppConstants.emailType.verifiedAccount);
            await this.#_updateUser(user.id);
            this.selfFinalizer.successReq(res, true, "Successfully verified in", 200);

        }).catch((err) => {
            this.selfFinalizer.failureReq(res, err, 500);
        });

    }

    async #_updateUser(userId) {
        await models.User.update({
            otpUsed: true,
            isVerified: true,
            isEnabled: true
        }, {where: {id: userId}});
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
        const {isEnabled, target} = req.body;
        log(req.body);
        if (isEmpty(isEnabled) || isEmpty(target)) {
            return this.selfFinalizer.failureReq(res, "Bad request", 400);
        }
        models.User.update({isEnabled: isEnabled}, {where: {id: target}})
            .then((flag) => {
                if (flag === 1) {
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
