'use strict';
const { Member, Project, Release,Role } = require('../models'); 
const releasesData = [
  // Add your release data here
  { name: "Release 1", description: "Description for release 1", start_date: new Date(), end_date: new Date() },
  { name: "Release 2", description: "Description for release 2", start_date: new Date(), end_date: new Date() },
  // Add more as needed
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projectManagerRole = await Role.findOne({ where: { name: 'project manager' } });
    const members = await Member.findAll({
      where: {
        role_id:  projectManagerRole.id // Adjust the role ID as needed
      }
    });
    const fakerCount = 100;
    const releases = [];
    for (let i = 0; i < fakerCount; i++) {
      const randomMember = members[Math.floor(Math.random() * members.length)];
      releases.push({
        project_id: randomMember.project_id,
        name: `Release ${i + 1}`,
        description: `Description for release ${i + 1}`,
        start_date: new Date(),
        end_date: new Date(),
        created_by: randomMember.id,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    await queryInterface.bulkInsert('releases', releases, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('releases', null, {});
  }
};
