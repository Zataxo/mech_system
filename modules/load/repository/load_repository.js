const InterfaceLoad = require("../interface/load_interface");
class LoadRepository extends InterfaceLoad {
  constructor() {
    super();
  }
  init() {
    console.log("Class initilze");
  }
  testFunc(req, res) {
    console.log("Hello from repo");
    res.send("Hello from repo");
  }
}
module.exports = new LoadRepository();
