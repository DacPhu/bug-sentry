'use strict';
const { Activity, User, Member } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const activities = await Activity.findAll({
        });
        for (const activity of activities) {
            const member = await Member.findOne({
                where: {
                    id: activity.member_id
                },
            });
            try {
                await activity.update({ user_id: member.user_id});
            } catch (error) {
                console.error(`Error updating test run ${activity.id}:`, error);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        // No need for down migration as it doesn't revert any changes
    }
};
