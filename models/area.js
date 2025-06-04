'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Area.init({
    areaName: DataTypes.STRING,
    areaTag: DataTypes.INTEGER,
    occupancy: DataTypes.FLOAT,
    area: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    areaType: DataTypes.ENUM('POWER_ROOM', 'POD_AREA', 'BATTERY_ROOM', 'CORRIDOR', 'LV_ROOM', 'MMR_ROOM', 'MV_ROOM', 'TR_ROOM', 'GENSET_ROOM'),
    batteryType: DataTypes.ENUM('VRLA', 'LITHIUM'),
    ventilationType: DataTypes.ENUM('VENTILATION_ONLY', 'NO_VENTILATION', 'VENTILATION_WITH_PRESSURIZATION'),
    zoneId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};