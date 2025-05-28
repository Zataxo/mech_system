class Finalizer {
  constructor() {
    this._response = {
      _isSuccess: false,
      _code: 0,
      _message: "",
      _response: null,
    };
  }

  setResponse(r) {
    this._response = r;
  }

  get resModel() {
    return this._response;
  }

  set setCode(code) {
    this._response._code = code;
  }

  set setMsg(msg) {
    this._response._message = msg;
  }

  set setSuccess(success) {
    this._response._isSuccess = success;
  }

  set setData(data) {
    this._response._response = data;
  }

  logger() {
    console.log("<<< Logger <===============> Logger >>>\n");
    console.log("REQUEST SUCCESS  :  ", this._response._isSuccess);
    console.log("STATUS CODE      :  ", this._response._code);
    console.log("REQUEST MSG      :  ", this._response._message);
    console.log("RESPONSE         :  ", this._response._response);
    console.log("<<< Logger <===============> Logger >>>\n");
  }

  finalize(res) {
    this.logger();
    res.status(this._response._code).json(this._response);
  }
}

module.exports = Finalizer;
