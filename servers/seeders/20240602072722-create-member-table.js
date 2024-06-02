'use strict';
const { User, Project, Role, Member } = require('../models'); 

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all users, projects, and roles from the database
    const projects = await Project.findAll();
    const roles = await Role.findAll();

    // Find the project manager role
    const projectManagerRole = roles.find(role => role.name.toLowerCase() === 'project manager');
    if (!projectManagerRole) {
      throw new Error('Project manager role not found');
    }

    // Filter roles to exclude the project manager role
    const nonProjectManagerRoles = roles.filter(role => role.id !== projectManagerRole.id);

    // Fetch all users who are not project managers
    const users = await User.findAll({
      where: {
        role_id: {
          [Sequelize.Op.not]: projectManagerRole.id
        }
      }
    });

    // Generate members for each project
    const members = [];
    const addedUserProjectPairs = new Set();
    
    for (const project of projects) {
      const projectManagerId = project.project_manager_id;

      // Add project manager to members
      members.push({
        user_id: projectManagerId,
        project_id: project.id,
        role_id: projectManagerRole.id,
      });

      addedUserProjectPairs.add(`${projectManagerId}-${project.id}`);

      // Add 30 members to each project with random roles excluding project manager role
      for (let i = 0; i < 10; i++) {
        let randomUser, userProjectPair;
        do {
          randomUser = users[Math.floor(Math.random() * users.length)];
          userProjectPair = `${randomUser.id}-${project.id}`;
        } while (addedUserProjectPairs.has(userProjectPair));

        const randomRole = nonProjectManagerRoles[Math.floor(Math.random() * nonProjectManagerRoles.length)];

        members.push({
          user_id: randomUser.id,
          project_id: project.id,
          role_id: randomUser.role_id,
        });

        addedUserProjectPairs.add(userProjectPair);
      }
    }

    await queryInterface.bulkInsert('members', members, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
