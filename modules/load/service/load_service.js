const Finalizer = require("../../../utils/finalizer");
const models = require("../../../models");
const {isEmpty, isListContainEmptyVal, log} = require("../../../utils/utilities");
const appConstants = require("../../../helpers/app_constants");
const {Op} = require("sequelize");
const {sendMail} = require("../../../utils/email_service");

class LoadService {
    constructor() {
        this.selfFinalizer = new Finalizer();
    }

    createProjectConfiguration(req, res) {
        const {country, city, userId} = req.body;
        if (isListContainEmptyVal([country, city]) || isEmpty(userId)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        let projConfig = {
            country: req.body.country,
            city: req.body.city,
            dbtMax: req.body.dbtMax ?? 0.0,
            wbtMax: req.body.wbtMax ?? 0.0,
            elevation: req.body.elevation ?? 0.0,
            chilledWater: req.body.chilledWater ?? 0.0,
            glycol: req.body.glycol ?? 0.0,
            cpWater: req.body.cpWater ?? 0.0,
            upsEfficiency: req.body.upsEfficiency ?? 0.0,
            batteryHeapDecp: req.body.batteryHeapDecp ?? 0.0,
            userId: req.body.userId

        }

        models.ProjectConfiguration.create(projConfig).then(projectConfig => {
            this.selfFinalizer.successReq(res, projectConfig, "Project Config created successfully", 201);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        });
    }

    deleteProjectConfiguration(req, res) {
    }

    updateProjectConfiguration(req, res) {
    }

    async getAllProjectConfigurations(req, res) {
        const userId = req.params.userId;
        models.ProjectConfiguration.findAll({
            where: {userId: userId},
            attributes: {exclude: ["userId"]}
        }).then(projectConfigs => {
            if (projectConfigs.length === 0) {
                return this.selfFinalizer.failureReq(res, "No configs found", 404);
            }
            this.selfFinalizer.successReq(res, projectConfigs, "Config Fetched", 200);

        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        })
    }

    createProject(req, res) {
        // res.send("Hello World");
        const {lProjName, userId} = req.body;
        if (isEmpty(lProjName) || isEmpty(userId)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        let lProj = {
            lProjName: lProjName,
            lProjConfigId: req.body.lProjConfigId,
            shareable: req.body.shareable ?? false,
            shareRestrictions: req.body.shareRestrictions ?? 'NON',
            isArchived: req.body.isArchived ?? false,
            isStarred: req.body.isStarred ?? false,
            userId: req.body.userId,

        }
        models.LoadProjects.create(lProj).then(project => {
            this.selfFinalizer.successReq(res, project, "Project created successfully", 201);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        });

    }

    controlProject(req, res) {
        /**
         * Note:only to star the project or archive  it
         */
        const userId = req.params.userId;
        const {lProjId, isStarred, isArchived} = req.body;

        if (isEmpty(userId) || isEmpty(lProjId)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        let updatedData = Object.fromEntries(
            Object.entries({isStarred, isArchived}).filter(([_, v]) => v !== undefined)
        );
        if (isEmpty(updatedData)) {
            return this.selfFinalizer.failureReq(res, "Bad request Nothing to update", 400);

        }

        models.LoadProjects.update(updatedData, {
            where: {
                [Op.and]: {
                    userId: userId,
                    id: lProjId,
                }
            }
        }).then(project => {
            this.selfFinalizer.successReq(res, project, "Updated successfully", 200);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        });

    }

    deleteProject(req, res) {
    }

    getAllProjects(req, res) {
        const userId = req.params.userId
        const filterBy = req.query.show;
        let whereClause = {userId};
        if (filterBy === appConstants.projectConditions.starred) {
            whereClause.isStarred = true;
        } else if (filterBy === appConstants.projectConditions.archived) {
            whereClause.isArchived = true;
        } else {
            log(filterBy);
            whereClause.isStarred = false;
            whereClause.isArchived = false;
        }
        models.LoadProjects.findAll({
            where: whereClause,
            include: [models.ProjectConfiguration, {
                model: models.Zone, include: [models.Area]
            }],

        }).then((projects) => {
            if (projects.length === 0) {
                return this.selfFinalizer.failureReq(res, "No Load projects found", 404);
            }
            this.selfFinalizer.successReq(res, projects, "Projects Fetched", 200);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        })
    }

    finalizeProject(req, res) {
    }

    createZone(req, res) {
        const {zoneName, lProjId} = req.body;
        if (isEmpty(zoneName) || isEmpty(lProjId)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        models.Zone.create(req.body).then(zone => {
            this.selfFinalizer.successReq(res, zone, "Zone created successfully", 201);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        });

    }

    controlZone(req, res) {
    }

    deleteZone(req, res) {
    }

    deleteAllZones(req, res) {
    }

    getAllZones(req, res) {
        const lProjId = req.body.userId;
        if (isEmpty(lProjId)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        models.Zone.findAll({where: {lProjId: lProjId}, include: [models.Area]},).then((zones) => {
            if (zones.length === 0) {
                return this.selfFinalizer.failureReq(res, "No Zones found", 404);
            }
            this.selfFinalizer.successReq(res, zones, "Zones Fetched", 200);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        })
    }

    createArea(req, res) {
        const {areaName, zoneId, areaTag} = req.body;
        if (isEmpty(areaName) || isEmpty(zoneId) || isEmpty(areaTag)) {
            return this.selfFinalizer.failureReq(res, "Bad request missing arguments", 400);
        }
        let area = {
            areaName: req.body.areaName,
            areaTag: req.body.areaTag,
            occupancy: req.body.occupancy ?? 0.0,
            area: req.body.area ?? 0.0,
            height: req.body.height ?? 0.0,
            areaType: req.body.areaType ?? appConstants.areaType.batteryRoom,
            batteryType: req.body.batteryType ?? appConstants.batteryType.vrla,
            ventilationType: req.body.ventilationType ?? appConstants.ventilationType.noVentilation,
            humidityLv: req.body.humidityLv ?? 0.0,
            areaLv: req.body.areaLv ?? 0.0,
            ventilationLv: req.body.ventilationLv ?? 0.0,
            zoneId: req.body.zoneId,
        }
        models.Area.create(area).then(area => {
            this.selfFinalizer.successReq(res, area, "Area created successfully", 201);
        }).catch(err => {
            this.selfFinalizer.failureReq(res, err, 500);
        });
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

module.exports = LoadService;