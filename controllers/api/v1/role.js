"use strict";

const controller = {};
const models = require("../../../models");

controller.getAllRoles = async (req, res) => {
    try {
        const roles = await models.Role.findAll();

        if (!roles || roles.length === 0) {
        return res.status(404).json({ message: "No roles found" });
        }

        return res.status(200).json({
            roles: roles,
        });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};

module.exports = controller;
