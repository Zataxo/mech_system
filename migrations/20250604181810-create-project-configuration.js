'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectConfigurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      dbtMax: {
        type: Sequelize.FLOAT
      },
      wbtMax: {
        type: Sequelize.FLOAT
      },
      elevation: {
        type: Sequelize.FLOAT
      },
      chilledWater: {
        type: Sequelize.FLOAT
      },
      glycol: {
        type: Sequelize.FLOAT
      },
      cpWater: {
        type: Sequelize.FLOAT
      },
      upsEffiency: {
        type: Sequelize.FLOAT
      },
      batteryHeapDecp: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('ProjectConfigurations');
  }
};