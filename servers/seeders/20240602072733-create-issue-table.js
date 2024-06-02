'use strict';
const { Project, Member, Issue } = require('../models'); // Adjust the path to your models

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const issueNames = require('../mocks/issues.json'); 
    
    const members = await Member.findAll({
      limit: 100,
      order: Sequelize.literal('random()')
    });

    const issues = [];
    const fakerCount = 200
    for (let i = 0; i < fakerCount; i++) {
      const member = members[Math.floor(Math.random() * members.length)];
      const memberId = member.id;

      const issueName = issueNames[Math.floor(Math.random() * issueNames.length)].name;
      issues.push({
        name: issueName,
        member_id: memberId,
        project_id: member.project_id,
        note : 'This is a note '+ i,
        created_at: Sequelize.literal('NOW()')
      });
    }
    console.log(issues)

    await queryInterface.bulkInsert('issues', issues, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issues', null, {});
  }
};
