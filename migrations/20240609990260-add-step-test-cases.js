'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('test_cases', 'steps', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },
  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('issues', 'status');
  }
};
