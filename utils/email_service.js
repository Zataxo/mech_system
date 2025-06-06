/**
 * @typedef {Object} emailReceptor
 * @property {string} emailSubject
 * @property {*} emailMsg
 */
const nodemailer = require("nodemailer");
const emailTemplate = require('./email_template_otp_verify');
const appConstants = require("../helpers/app_constants");
module.exports = class MailService {
    /**
     *
     * @param {string} receiverMail
     * @param {Object} type
     * @param {string?} otp
     */
    static sendMail = (receiverMail, type, otp) => {
        console.log("Here Email");
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.SENDER_PASS,
            },
        });
        let emailToBeSent;
        let emailTemplateToBeSent;
        if (type === appConstants.emailType.otpVerification) {
            emailToBeSent = appConstants.emailType.otpVerification;
            emailTemplateToBeSent = emailTemplate.emailHtmlTemplate.otpVerification
                .replace('{{OTP_CODE}}', otp)
                .replace('{{USER_EMAIL}}', receiverMail)
        } else {
            emailToBeSent = appConstants.emailType.verifiedAccount;
            emailTemplateToBeSent = emailTemplate.emailHtmlTemplate.verifiedAccount.replace('{{USER_NAME}}', receiverMail)
                .replace('{{USER_EMAIL}}', receiverMail);

        }

        /**
         * @typedef {Object} mailOptions
         * @property {string} from
         * @property {string} to
         * @property {string} subject
         * @property {string} text
         * @property {html} html
         */

        const mailOptions = {

            to: receiverMail,
            subject: emailToBeSent.emailSubject,
            text: emailToBeSent.emailType,
            html: emailTemplateToBeSent,
        };

        /**
         * @returns {boolean}
         */
        transporter.sendMail(mailOptions, function (error, info) {
            console.log("transporter");
            if (error) {
                console.log(error);
                return false;
                // return res.status(500).send(error);
            } else {
                console.log("Email sent: " + info.response);
                return true;
                // return res.status(200).send("Mail Sent!!");
            }
        });
    };
};
