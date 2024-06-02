'use strict';
const { Member, Activity, Project } = require('../models'); 

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all members and projects from the database
    const members = await Member.findAll({ limit: 100 });

    // Generate activities for each member
    const activities = [];
    for (const member of members) {
      const memberId = member.id;

      // Create 1-10 activities per member
      const activityCount = Math.floor(Math.random() * 10) + 1;
      for (let i = 0; i < activityCount; i++) {
        activities.push({
          member_id: memberId,
          project_id: member.project_id,
          title_name: `Activity ${i + 1} for Member ${memberId}`,
          action: ['edit', 'add', 'create', 'delete'][Math.floor(Math.random() * 4)],
          time: Sequelize.literal('NOW()'),
        });
      }
    }
    await queryInterface.bulkInsert('activities', activities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activities', null, {});
  }
};
