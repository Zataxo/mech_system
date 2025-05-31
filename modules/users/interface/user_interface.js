class InterfacUser {
  #_requiredMethods = [
    "signIn",
    "signUp",
    "resetPassword",
    "verify",
    "getAllUsers",
  ];

  constructor() {
    this.#_safeGuard();
    this.#_validateImpl();
  }

  #_validateImpl() {
    for (const method of this.#_requiredMethods) {
      if (typeof this[method] !== "function") {
        throw new Error(`Class must implement method: ${method}`);
      }
    }
  }
  #_safeGuard() {
    if (this.constructor === InterfacUser) {
      throw new Error("Cannot instantiate interface directly");
    }
  }
}

module.exports = InterfacUser;
