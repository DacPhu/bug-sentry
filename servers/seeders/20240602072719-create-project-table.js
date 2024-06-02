'use strict';
const { User, Project, Role } = require('../models'); // Adjust the path to your models

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all users and roles from the database
    const users = await User.findAll();
    const roles = await Role.findAll();

    // Find the project manager role
    const projectManagerRole = roles.find(role => role.name.toLowerCase() === 'project manager');
    if (!projectManagerRole) {
      throw new Error('Project manager role not found');
    }

    // Filter users with project manager role
    const projectManagerUsers = users.filter(user => user.role_id === projectManagerRole.id);
    if (projectManagerUsers.length === 0) {
      throw new Error('No users with project manager role found');
    }

    // Generate projects
    const projects = [];
    for (let i = 0; i < 20; i++) {
      projects.push({
        name: `Project ${i + 1}`,
        created_at: Sequelize.literal('NOW()'),
        project_manager_id: projectManagerUsers[Math.floor(Math.random() * projectManagerUsers.length)].id,
        number_of_members: Math.floor(Math.random() * 10) + 1,
      });
    }
    await queryInterface.bulkInsert('projects', projects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
