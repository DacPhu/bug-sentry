'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('test_runs', 'status', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      defaultValue: 0
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('test_runs', 'status');
  }
};
