'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      areaName: {
        type: Sequelize.STRING
      },
      areaTag: {
        type: Sequelize.INTEGER
      },
      occupancy: {
        type: Sequelize.FLOAT
      },
      area: {
        type: Sequelize.FLOAT
      },
      height: {
        type: Sequelize.FLOAT
      },
      areaType: {
        type: Sequelize.ENUM('POWER_ROOM', 'POD_AREA', 'BATTERY_ROOM', 'CORRIDOR', 'LV_ROOM', 'MMR_ROOM', 'MV_ROOM', 'TR_ROOM', 'GENSET_ROOM')
      },
      batteryType: {
        type: Sequelize.ENUM('VRLA', 'LITHIUM')
      },
      ventilationType: {
        type: Sequelize.ENUM('VENTILATION_ONLY', 'NO_VENTILATION', 'VENTILATION_WITH_PRESSURIZATION')
      },
      humidityLv: {
        type: Sequelize.FLOAT
      },
      areaLv: {
        type: Sequelize.FLOAT
      },
      ventilationLv: {
        type: Sequelize.FLOAT
      },
      zoneId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Areas');
  }
};