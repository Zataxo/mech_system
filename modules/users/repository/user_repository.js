const UserInterface = require("../interface/user_interface");
const UserService = require("../service/user_service");
// const Finalizer = require("../../../utils/finalizer");

class UserRepository extends UserInterface {
  constructor() {
    super();
    // this.tes();
  }

  signIn(req, res) {
    const userService = new UserService();
    userService.signIn(req, res);
  }
  signUp(req, res) {
    const userService = new UserService();
    userService.signUp(req, res);
  }
  resetPassword(req, res) {
    const userService = new UserService();
    userService.resetPassword(req, res);
  }
  verify(req, res) {
    const userService = new UserService();
    userService.verify(req, res);
  }
  getAllUsers(req, res) {
    const userService = new UserService();
    userService.getAllUsers(req, res);
  }
  controlAccount(req, res) {
    const userService = new UserService();
    userService.controlAccount(req, res);
  }

  // #_loadInstace(){
  //   const uService = new UserService();
  // }
}

module.exports = new UserRepository();
