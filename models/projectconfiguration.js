"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectConfiguration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectConfiguration.init(
    {
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      dbtMax: DataTypes.FLOAT,
      wbtMax: DataTypes.FLOAT,
      elevation: DataTypes.FLOAT,
      chilledWater: DataTypes.FLOAT,
      glycol: DataTypes.FLOAT,
      cpWater: DataTypes.FLOAT,
      upsEffiency: DataTypes.FLOAT,
      batteryHeapDecp: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ProjectConfiguration",
    }
  );
  return ProjectConfiguration;
};
