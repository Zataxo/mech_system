const InterfaceLoad = require("../interface/load_interface");
const Finalizer = require("../../../helpers/finalizer");
class LoadRepository extends InterfaceLoad {
  constructor() {
    super();
  }
  init() {
    console.log("Class initilze");
  }
  testFinalizer(req, res) {
    const finalizer = new Finalizer();
    finalizer.setCode = 200;
    finalizer.setSuccess = true;
    finalizer.setMsg = "Operation completed successfully";
    finalizer.setData = { user: "Jane Doe" };

    finalizer.setResponse(finalizer.resModel);

    finalizer.finalize(res); //
  }
}
module.exports = new LoadRepository();
