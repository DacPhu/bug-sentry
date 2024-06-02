'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'developer',
        description: 'Responsible for writing and maintaining code.',
      },
      {
        name: 'tester',
        description: 'Responsible for testing the software for bugs and issues.',
      },
      {
        name: 'project manager',
        description: 'Responsible for overseeing the project and coordinating tasks.',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
