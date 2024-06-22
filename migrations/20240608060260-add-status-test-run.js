'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('test_runs', 'status', {
       type: Sequelize.STRING, allowNull: true, defaultValue: "untested" 
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('test_runs', 'status');
  }
};
