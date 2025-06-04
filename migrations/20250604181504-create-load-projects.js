'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LoadProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lProjName: {
        type: Sequelize.STRING
      },
      lProjConfigId: {
        type: Sequelize.INTEGER
      },
      shareable: {
        type: Sequelize.BOOLEAN
      },
      shareRestrictions: {
        type: Sequelize.ENUM('NON', 'EDIT', 'VIEW')
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
    await queryInterface.dropTable('LoadProjects');
  }
};