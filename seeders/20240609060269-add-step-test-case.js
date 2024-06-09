'use strict';
const { TestCase } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const testCase = await TestCase.findAll({
        });
        const descriptionTestSteps = [
            'Open the browser',
            'Go to the website',
            'Click on the button',
            'Verify the text',
            'Close the browser'
        ];
        const expectedResults = [
            'Browser is opened',
            'Website is loaded',
            'Button is clicked',
            'Text is verified',
            'Browser is closed'
        ];
        const MAX_STEP = 4;
        for (const test of testCase) {
            const steps = [];
            const randomStep = Math.floor(Math.random() * MAX_STEP) + 1;
            for (let i = 0; i < randomStep; i++) {
                const step ={
                    description: descriptionTestSteps[i],
                    expectedResult: expectedResults[i]
                
                }
                steps.push(step);
            }
            try {
                await test.update({ steps: JSON.stringify(steps) });
            } catch (error) {
                console.error(`Error updating test case ${test.id}:`, error);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        // No need for down migration as it doesn't revert any changes
    }
};
