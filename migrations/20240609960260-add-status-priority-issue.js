'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('issues', 'status', {
      type: Sequelize.STRING, allowNull: true, defaultValue: 'open' 
    });

    await queryInterface.addColumn('issues', 'priority', {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [['critical', 'high', 'medium', 'low']]
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('issues', 'status');
  }
};
