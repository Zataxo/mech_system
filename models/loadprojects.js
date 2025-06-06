'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoadProjects extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoadProjects.hasOne(models.ProjectConfiguration, {
                sourceKey: "lProjConfigId",
                foreignKey: "id",
            });
            LoadProjects.hasMany(models.Zone, {
                foreignKey: "lProjId",
            });
        }
    }

    LoadProjects.init({
        lProjName: DataTypes.STRING,
        lProjConfigId: DataTypes.INTEGER,
        shareable: DataTypes.BOOLEAN,
        shareRestrictions: DataTypes.ENUM('NON', 'EDIT', 'VIEW'),
        isArchived: DataTypes.BOOLEAN,
        isStarred: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'LoadProjects',
    });
    return LoadProjects;
};