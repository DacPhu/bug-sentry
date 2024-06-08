'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('test_runs', 'release_id', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'releases', // Name of the table you are referencing
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('test_runs', 'release_id');
  }
};
