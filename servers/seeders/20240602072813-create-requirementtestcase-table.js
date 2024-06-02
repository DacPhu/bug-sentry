'use strict';
const { where } = require('sequelize');
const { Requirement, TestCase, RequirementTestCase } = require('../models'); 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    const fakerCount = 50; 
    const requirementTestCases = [];

    for (let i = 0; i < fakerCount; i++) {
      const requirement = await Requirement.findOne({
        order: Sequelize.literal('random()')
      });
      const testCase = await TestCase.findOne({
        order: Sequelize.literal('random()'),
        where : {
          project_id: requirement.project_id
        }
      });
      
      requirementTestCases.push({
        requirement_id: requirement.id,
        test_case_id: testCase.id,
      });
    }

    for (const rtc of requirementTestCases) {
      await queryInterface.bulkInsert('requirement_test_cases', [rtc], {
        ignoreDuplicates: true // This will skip inserts that violate the unique constraint
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requirement_test_cases', null, {});
  }
};
