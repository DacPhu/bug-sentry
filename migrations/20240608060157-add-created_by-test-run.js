'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('test_runs', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'members', // Name of the table you are referencing
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('test_runs', 'created_by');
  }
};
