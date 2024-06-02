"use strict";

const controller = {};
const models = require("../models");

controller.getRole = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Role id is empty." });
  }

  try {
    const role = await models.Role.findOne({
      where: { id },
      attributes: ["id", "name", "description"],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllRole = async (req, res) => {
  try {
    const roles = await models.Role.findAll({
      attributes: ["id", "name", "description"],
    });

    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found" });
    }

    // Return the users array as a JSON response
    return res.status(200).json({
      roles: roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
