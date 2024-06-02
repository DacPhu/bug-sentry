'use strict';
const { Member, Project, TestCase, TestRun, Role } = require('../models'); 

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
    const testRuns = [];

    for (let i = 0; i < fakerCount; i++) {
      const randomMember = members[Math.floor(Math.random() * members.length)];
     
      const randomTestCase = await TestCase.findOne({
        where: {
          project_id: randomMember.project_id,
        },
        order : Sequelize.literal('random()')
      });

      testRuns.push({
        name: `Test Run ${i + 1}`,
        project_id: randomMember.project_id,
        description: `Description for test run ${i + 1}`,
        content: `Content for test run ${i + 1}`,
        tester_id: randomMember.id,
        test_case_id: randomTestCase.id,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    await queryInterface.bulkInsert('test_runs', testRuns, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_runs', null, {});
  }
};
