const models = require("../models");

class Utilities {
    /**
     *
     * @param {string} newUserMail
     * @returns {boolean}
     */
    static isDuplicateEmail = async (newUserMail) => {
        let result = await models.User.findOne({where: {email: newUserMail}});
        if (result != null) {
            return true;
        }
        return false;
    };

    /**
     *
     * @param {string} userId
     * @returns {boolean}
     */
    static isUserExists = async (userId) => {
        let result = await models.User.findOne({where: {id: userId}});
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
        if (val === null || val === undefined || val === "") return true;

        if (typeof val === "string") return val.trim() === "";

        if (Array.isArray(val)) return val.length === 0;

        if (typeof val === "object") return Object.keys(val).length === 0;

        return false;
    }

    /**
     *
     * @param {array[]} val
     * @returns {boolean}
     */
    static isListContainEmptyVal(val) {
        val.forEach((item) => {
            if (item == null || item === "") return true;

        });
        return false;

    }

    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

module.exports = Utilities;
