'use strict';
const { Project, Member, Issue, Comment } = require('../models'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const commentContents = require('../mocks/comments.json'); 

    // Fetch 50 random issues from the database
    const issues = await Issue.findAll({
      limit: 50,
      order: Sequelize.literal('random()')
    });

    // Fetch all members from the database
    
    const comments = [];
    for (const issue of issues) {

      const members = await Member.findAll({
        where: {
          project_id: issue.project_id
        }
      });

      const issueId = issue.id;
      const projectId = issue.project_id;

      // Generate 2-4 comments per issue
      const numComments = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4

      for (let i = 0; i < numComments; i++) {
        const randomMember = members[Math.floor(Math.random() * members.length)];
        const commentContent = commentContents[Math.floor(Math.random() * commentContents.length)].name;

        comments.push({
          content: commentContent,
          project_id: projectId,
          member_id: randomMember.id,
          issue_id: issueId,
          type: 'general', // Adjust as needed
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }
    }

    await queryInterface.bulkInsert('comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
