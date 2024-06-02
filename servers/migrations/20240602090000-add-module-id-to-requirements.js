'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('requirements', 'module_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust this based on whether you want this column to allow NULL values
      references: {
        model: 'modules', // Name of the table you are referencing
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('requirements', 'module_id');
  }
};
