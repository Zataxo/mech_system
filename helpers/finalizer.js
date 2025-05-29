/**
 * @typedef {Object} ResponseModel
 * @property {boolean} success
 * @property {number} code
 * @property {string} message
 * @property {*} data
 */

class Finalizer {
  /** @type {ResponseModel} */
  #_response = {
    success: false,
    code: 0,
    message: "",
    data: null,
  };

  /**
   * @param {number} value
   */
  set code(value) {
    this.#_response.code = value;
  }

  /**
   * @param {string} value
   */
  set message(value) {
    this.#_response.message = value;
  }

  /**
   * @param {boolean} value
   */
  set success(value) {
    this.#_response.success = value;
  }

  /**
   * @param {{ result: any }} value
   */
  set data(value) {
    this.#_response.data = value;
  }

  get response() {
    return { ...this.#_response };
  }

  logger() {
    console.log("<<< Logger <===============> Logger >>>\n");
    console.log("REQUEST SUCCESS  :  ", this.#_response.success);
    console.log("STATUS CODE      :  ", this.#_response.code);
    console.log("REQUEST MSG      :  ", this.#_response.message);
    console.log("RESPONSE         :  ", this.#_response.data);
    console.log("<<< Logger <===============> Logger >>>\n");
  }

  finalize(res) {
    this.logger();
    res.status(this.response.code).json(this.response);
  }

  /**
   * @type {{msg : any}}
   */
  static log(val) {
    console.log(val);
  }
}

module.exports = Finalizer;
