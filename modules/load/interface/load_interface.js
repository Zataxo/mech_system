class InterfaceLoad {
  constructor() {
    this.#_safeGuard();
    if (!this.init) {
      throw new Error("Every load class must impelement all functions");
    }
  }
  #_safeGuard() {
    if (this.constructor === InterfaceLoad) {
      throw new Error("Cannot instantiate interface directly");
    }
  }
}
module.exports = InterfaceLoad;
