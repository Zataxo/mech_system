class InterfaceLoad {
  #_requiredMethods = [
    "createProjectConfiguration",
    "deleteProjectConfiguration",
    "updateProjectConfiguration",
    "getAllProjectConfigurations",
    "createProject",
    "controlProject",
    "archiveProject",
    "deleteProject",
    "getAllProjects",
    "finalizeProject",
    "createZone",
    "controlZone",
    "deleteZone",
    "deleteAllZones",
    "getAllZones",
    "createArea",
    "controlArea",
    "deleteArea",
    "deleteAllAreas",
    "getAllAreas",
  ];
  constructor() {
    this.#_safeGuard();
    this.#_validateImpl();
    if (!this.init) {
      throw new Error("Every load class must impelement all functions");
    }
  }
  #_safeGuard() {
    if (this.constructor === InterfaceLoad) {
      throw new Error("Cannot instantiate interface directly");
    }
  }
  #_validateImpl() {
    for (const method of this.#_requiredMethods) {
      if (typeof this[method] !== "function") {
        throw new Error(`Class must implement method: ${method}`);
      }
    }
  }
}
module.exports = InterfaceLoad;
