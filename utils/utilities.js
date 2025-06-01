const models = require("../models");
class Utilities {
  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  static isDuplicateEmail = async (newUserMail) => {
    var result = await models.User.findOne({ where: { email: newUserMail } });
    if (result != null) {
      return true;
    }
    return false;
  };

  /**
   * @param {*} val
   */
  static log(val) {
    console.log(val);
  }

  /**
   * @param {*} val
   * @returns {boolean}
   */
  static isEmpty(val) {
    if (val == null || val == undefined) return true;

    if (typeof val === "string") return val.trim() === "";

    if (Array.isArray(val)) return val.length === 0;

    if (typeof val === "object") return Object.keys(val).length === 0;

    return false;
  }

  /**
   * @param {int} val
   * @returns {boolean}
   */
}

module.exports = Utilities;
