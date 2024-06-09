'use strict';
const { TestRun } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const testRuns = await TestRun.findAll({
        });
        const MAX_STATUS = 4;
        for (const testRun of testRuns) {
            const randomStatus = Math.floor(Math.random() * MAX_STATUS);
            try {
                await testRun.update({ status: randomStatus});
            } catch (error) {
                console.error(`Error updating test run ${testRun.id}:`, error);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        // No need for down migration as it doesn't revert any changes
    }
};
