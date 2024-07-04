"use strict";

const models = require("../../../models");

const controller = {};

// Gửi thông báo
controller.sendNotification = async (req, res) => {
    try {
        const { name, user_id, project_id, content } = req.body;
        if (!name || !user_id || !project_id || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const notification = await models.Notification.create({
            name,
            user_id,
            project_id,
            content,
        });
        req.io.to(notification.project_id).emit('notification', notification);
        res.status(201).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Nhận thông báo
controller.receiveNotification = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        
        const notifications = await models.Notification.findAll({
            include: [{
                model: models.Project,
                required: true,
                include: [{
                    model: models.Member,
                    where: {user_id: user_id}
                }]
            }, {
                model: models.User,
                attributes: ["first_name", "last_name", "profile_picture"],
                required: true,
            }],
            order: [['time', 'DESC']]
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = controller;
