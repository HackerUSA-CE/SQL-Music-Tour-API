'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stages', {
      stage_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stages')
  }
}