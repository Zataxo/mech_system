/**
 * @typedef {Object} emailReceptor
 * @property {string} emailSubject
 * @property {*} emailMsg
 */

const nodemailer = require("nodemailer");
const AppConstants = require("../helpers/app_constants");
module.exports = class MailService {
  /**
   *
   * @param {string} receiverMail
   */
  static sendMail = (receiverMail) => {
    console.log("Here Email");
    var transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      //   service: "outlook", // gmail - yahoo > email provider
      auth: {
        user: "maddison53@ethereal.email", //note this is test account found in npm
        pass: "jn7jnAPss4f63QBp6D", //note this is test account found in npm
      },
      //   auth: {
      //     user: process.env.SENDER_MAIL, // auth email
      //     pass: process.env.SENDER_PASS, // auth pass
      //   },
    });
    ///[Sending email to multiple emails] => take a list of receivers exmp:
    // var mailOptions = {
    //   from: 'youremail@gmail.com',
    //   to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // }
    /**
     * @typedef {Object} mailOptions
     * @property {string} from
     * @property {string} to
     * @property {string} subject
     * @property {string} text
     * @property {html} html
     */

    var mailOptions = {
      //   from: process.env.SENDER_MAIL,
      from: "maddison53@ethereal.email",
      to: receiverMail,
      subject: AppConstants.emailReceptor.emailSubject,
      text: AppConstants.emailReceptor.emailMsg,
      html: "<b>Account Activation</b>", // HTML body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      console.log("transporter");
      if (error) {
        console.log(error);
        // return res.status(500).send(error);
      } else {
        console.log("Email sent: " + info.response);
        // return res.status(200).send("Mail Sent!!");
      }
    });
  };
};
// module.exports = MailService;
