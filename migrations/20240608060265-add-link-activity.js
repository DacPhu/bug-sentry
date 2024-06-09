'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('activities', 'link', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('activities', 'link');
  }
};
