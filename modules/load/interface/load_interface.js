class InterfaceLoad {
  constructor() {
    if (!this.init) {
      throw new Error("Every load class must must impelement init");
    }
  }
}
module.exports = InterfaceLoad;
