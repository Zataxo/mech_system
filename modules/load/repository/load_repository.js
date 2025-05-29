const InterfaceLoad = require("../interface/load_interface");
const Finalizer = require("../../../helpers/finalizer");
class LoadRepository extends InterfaceLoad {
  constructor() {
    super();
    // this.init();
  }
  init() {
    console.log("Class init");
  }
  testFinalizer(req, res) {
    const finalizer = new Finalizer();
    // finalizer._response.
    finalizer.code = 200;
    finalizer.success = true;
    finalizer.message = "Operation completed successfully";
    finalizer.data = {
      result: [],
    };

    // finalizer.setResponse(finalizer.resModel);

    finalizer.finalize(res); //
  }
}
module.exports = new LoadRepository();
