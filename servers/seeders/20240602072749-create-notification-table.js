'use strict';
const { Member } = require('../models'); 
const notificationsData = [
  // Add your notification data here
  { name: "Notification 1", content: "Content for notification 1" },
  { name: "Notification 2", content: "Content for notification 2" },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const members = await Member.findAll();
    const fakerCount = 100;
    const notifications = [];
    for (let i = 0; i < fakerCount; i++) {
      const randomUser = members[Math.floor(Math.random() * members.length)];
      notifications.push({
        user_id: randomUser.user_id,
        project_id: randomUser.project_id,
        name: `Notification ${i + 1}`,
        content: `Content for notification ${i + 1}`,
        time: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    await queryInterface.bulkInsert('notifications', notifications, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  }
};
