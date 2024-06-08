'use strict';
const { where } = require('sequelize');
const { Project, Module, Requirement } = require('../models'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = await Project.findAll();

    for (const project of projects) {
      const projectId = project.id;

      // Find all modules for the current project
      const modules = await Module.findAll({
        where: { project_id: projectId }
      });

      if (modules.length === 0) {
        // Skip this project if no modules found
        continue;
      }

      // For each requirement in the current project, assign a random module_id
      const requirements = await Requirement.findAll({
        where: { project_id: projectId }
      });

      for (const requirement of requirements) {
        const randomModule = modules[Math.floor(Math.random() * modules.length)];
        await requirement.update({ module_id: randomModule.id });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Revert the module_id updates for all requirements
    await queryInterface.bulkUpdate('requirements', { module_id: null }, {});
  }
};
