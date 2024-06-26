'use strict';
const { Issue } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const issues = await Issue.findAll({
        });
        const MAX_STATUS = 4;
        for (const issue of issues) {
            const priority = ['critical', 'high', 'medium', 'low']
            const status = ['open', 'in progress', 'resolved', 'closed']
            const randomPriority = priority[Math.floor(Math.random() * priority.length)];
            const randomStatus = status[Math.floor(Math.random() * MAX_STATUS)];
            try {
                await issue.update({ priority: randomPriority, status: randomStatus});
            } catch (error) {
                console.error(`Error updating test run ${issue.id}:`, error);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('issues', null, {});
    }
};
