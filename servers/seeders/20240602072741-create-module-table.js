'use strict';
const { Project, Member,Role, Module } = require('../models'); 
const fs = require('fs');
const path = require('path');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = fs.readFileSync(path.join(__dirname, '../mocks/modules.json'), 'utf8');
    const moduleNames = JSON.parse(data);
    const projects = await Project.findAll();
    const developerRole = await Role.findOne({ where: { name: 'developer' } })
    // Generate modules for each project
    const modules = [];
    for (const project of projects) {
      const projectId = project.id;
      let nonDeveloperMembers = await Member.findAll({
        where: {
          role_id: { [Sequelize.Op.ne]: developerRole.id },
          project_id: projectId
        }
      });
      if (nonDeveloperMembers.length === 0) {
        throw new Error('No members found with a role other than developer.');
      }
      const numModules = Math.floor(Math.random() * 4) + 2; // Generate a random number between 2 and 5

      // Create modules for the project
      for (let i = 0; i < numModules; i++) {
        const randomMember = nonDeveloperMembers[Math.floor(Math.random() * nonDeveloperMembers.length)];
        modules.push({
          name: moduleNames[Math.floor(Math.random() * moduleNames.length)].name,
          project_id: projectId,
          created_by: randomMember.id,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }
    }
    await queryInterface.bulkInsert('modules', modules, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};
