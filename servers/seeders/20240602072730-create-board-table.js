'use strict';
const { User, Board } = require('../models'); // Adjust the path to your models

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch 100 random users from the database
    const users = await User.findAll({
      limit: 100,
      order: Sequelize.literal('random()')
    });

    // Generate boards for each user
    const boards = [];
    for (const user of users) {
      const userId = user.id;

      // Create 2 boards per user
      for (let i = 0; i < 2; i++) {
        boards.push({
          name: `Board ${i + 1} for User ${userId}`,
          user_id: userId,
          created_at: Sequelize.literal('NOW()'),
        });
      }
    }
    await queryInterface.bulkInsert('boards', boards, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('boards', null, {});
  }
};
