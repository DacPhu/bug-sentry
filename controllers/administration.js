"use strict";

const models = require("../models");

const controller = {};

controller.showAll = (req, res) => {
  res.render("administration");
};

controller.showAddUserForm = (req, res) => {
  const projectId = req.query.id;
  res.render("addUser", { projectId });
};

controller.getUserRole = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await models.User.findOne({
      where: {
        email: user.email,
      },
      attributes: ["id", "username", "first_name", "last_name", "role_id"],
    });

    const role = await sequelize.models.Role.findOne({
      where: {
        id: user.role_id,
      },
      attributes: ["name"],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Return the user and role information as a JSON response
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      role: role.name,
    });
  }
};

controller.addUserToProject = async (req, res) => {
  const { userId, projectId, roleId } = req.body;

  //   if (!userId || !roleId || !projectId) {
  //     return res.status(400).
  //   }

  try {
    const users = await models.User.findAll({
      where: whereClause,
      attributes: ["id", "username", "role_id"],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    await models.Member.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    });

    res.redirect("/users");
  } catch (error) {
    console.error("Error adding user:", error);
    res.send("Can not add user!");
    console.error(error);
  }
};

module.exports = controller;