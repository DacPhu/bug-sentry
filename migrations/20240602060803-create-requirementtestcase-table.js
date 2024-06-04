'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requirement_test_cases', {
      requirement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'requirements',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      test_case_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'test_cases',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('requirement_test_cases');
  }
};
