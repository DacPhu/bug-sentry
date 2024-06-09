'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('issues', 'status', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      defaultValue: 0
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
