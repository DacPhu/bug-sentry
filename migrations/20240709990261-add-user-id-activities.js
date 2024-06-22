'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('activities', 'user_id', {
     type: Sequelize.INTEGER,
      allowNull: true, // Adjust this based on whether you want this column to allow NULL values
      references: {
        model: 'users', // Name of the table you are referencing
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('issues', 'status');
  }
};
