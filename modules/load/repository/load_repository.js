const InterfaceLoad = require("../interface/load_interface");
const Finalizer = require("../../../utils/finalizer");
const LoadService = require('../service/load_service');

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

    createProjectConfiguration(req, res) {
        const _loadService = new LoadService();
        _loadService.createProjectConfiguration(req, res);
    }

    deleteProjectConfiguration(req, res) {
    }

    updateProjectConfiguration(req, res) {
    }

    getAllProjectConfigurations(req, res) {
        const _loadService = new LoadService();
        _loadService.getAllProjectConfigurations(req, res);
    }

    createProject(req, res) {
        const _loadService = new LoadService();
        _loadService.createProject(req, res);
    }


    controlProject(req, res) {
        const _loadService = new LoadService();
        _loadService.controlProject(req, res);
    }
    
    deleteProject(req, res) {
    }

    getAllProjects(req, res) {
        const _loadService = new LoadService();
        _loadService.getAllProjects(req, res);
    }

    finalizeProject(req, res) {
    }

    createZone(req, res) {
        const _loadService = new LoadService();
        _loadService.createZone(req, res);
    }

    controlZone(req, res) {
    }

    deleteZone(req, res) {
    }

    deleteAllZones(req, res) {
    }

    getAllZones(req, res) {
        const _loadService = new LoadService();
        _loadService.getAllZones(req, res);
    }

    createArea(req, res) {
        const _loadService = new LoadService();
        _loadService.createArea(req, res);
    }

    controlArea(req, res) {
    }

    deleteArea(req, res) {
    }

    deleteAllAreas(req, res) {
    }

    getAllAreas(req, res) {
    }


}

module.exports = new LoadRepository();
