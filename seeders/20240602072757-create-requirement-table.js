'use strict';
const { Member, Project, Requirement,Role } = require('../models'); 
const requirementsData = [
  // Add your requirement data here
  { name: "Requirement 1", description_url: "http://example.com/1" },
  { name: "Requirement 2", description_url: "http://example.com/2" },
  // Add more as needed
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const developerRole = await Role.findOne({ where: { name: 'developer' } });
    const members = await Member.findAll({
      where: {
        role_id: {
          [Sequelize.Op.ne]: developerRole.id 
        }
      }
    });
    const fakerCount = 100;
    const requirements = [];
    for (let i = 0; i < fakerCount; i++) {
      const randomMember = members[Math.floor(Math.random() * members.length)];
      requirements.push({
        project_id: randomMember.project_id,
        name: `Requirement ${i + 1}`,
        url: `http://example.com/${i + 1}`,
        description: `Description for requirement ${i + 1}`,
        created_by: randomMember.id,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        
      });
    }

    await queryInterface.bulkInsert('requirements', requirements, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requirements', null, {});
  }
};
