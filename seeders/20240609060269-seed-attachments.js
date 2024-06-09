'use strict';
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const {Attachment, Project} = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = fs.readFileSync(path.join(__dirname, '../mocks/users.json'), 'utf8');
    const links = JSON.parse(data);
   
    const projects = await Project.findAll();
    const fakerCount = 100;
    const attachments = [];
    const types = ['pdf','ppt', 'doc', 'xls', 'txt']
    for (let i = 0; i < fakerCount; i++) {
      const project = projects[Math.floor(Math.random() * projects.length)];
      const link = links[Math.floor(Math.random() * links.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      attachments.push({
        project_id: project.id,
        name: link.first_name,
        path: link.profile_picture,
        type : type
      });
    }



    // Insert the data into the database
    await queryInterface.bulkInsert('attachments', attachments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attachments', null, {});
  }
};
