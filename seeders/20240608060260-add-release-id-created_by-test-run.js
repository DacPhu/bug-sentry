'use strict';
const { Project, TestRun, Release,  Member, Role } = require('../models'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = await Project.findAll();
    const developerRole = await Role.findOne({ where: { name: 'developer' } });

    for (const project of projects) {
      const projectId = project.id;

      const members = await Member.findAll({
        where: { project_id: projectId,
          role_id: {
            [Sequelize.Op.ne]: developerRole.id 
          }
        },
      });

      const releases = await Release.findAll({
        where: { project_id: projectId }
      });

      if (members.length === 0 || releases.length === 0) {
        // Skip this project if no members or releases found
        continue;
      }

      const testRuns = await TestRun.findAll({
        where: { project_id: projectId }
      });

      for (const testRun of testRuns) {
        const randomRelease = releases[Math.floor(Math.random() * releases.length)];
        const randomMember = members[Math.floor(Math.random() * members.length)];
        console.log("updated", testRun.id, randomRelease.id, randomMember.id);
        try {
          await testRun.update({ release_id: randomRelease.id, created_by: randomMember.id });
        } catch (error) {
          console.error(`Error updating test run ${testRun.id}:`, error);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // No need for down migration as it doesn't revert any changes
  }
};
