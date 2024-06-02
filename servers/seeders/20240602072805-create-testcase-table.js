'use strict';
const { Member, Project, Module, TestCase,Role } = require('../models'); 

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
    const testCases = [];

    for (let i = 0; i < fakerCount; i++) {
      const randomMember = members[Math.floor(Math.random() * members.length)];
     
      const randomModule = await Module.findOne({
        where: {
          project_id: randomMember.project_id,
        },
        order : Sequelize.literal('random()')
      });

      testCases.push({
        title: `Test Case ${i + 1}`,
        project_id: randomMember.project_id,
        module_id: randomModule.id,
        tester_id: randomMember.id,
        description: `Description for test case ${i + 1}`,
        type: ['Functional', 'Non-functional', 'Regression'][Math.floor(Math.random() * 3)],
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    await queryInterface.bulkInsert('test_cases', testCases, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_cases', null, {});
  }
};
