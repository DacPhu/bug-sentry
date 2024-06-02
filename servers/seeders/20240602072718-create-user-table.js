'use strict';
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = fs.readFileSync(path.join(__dirname, '../mocks/users.json'), 'utf8');
    const users = JSON.parse(data);
    
    // Fetch all roles from the database
    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM roles`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    );

    if (!roles.length) {
      throw new Error('No roles found in the database');
    }

    // Assign a random role to each user
    users.forEach((user) => {
      user.role_id = roles[Math.floor(Math.random() * roles.length)].id;
      user.username = user.email;
      delete user.gender;
      delete user.id
    });


    console.log('users', users);
   

    // Insert the data into the database
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
