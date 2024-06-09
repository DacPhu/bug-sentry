"use strict";

const models = require("../models");

const controller = {};

controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;
    // Lấy toàn bộ member có trong projectID
    const members = await models.Member.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: models.User,
          attributes: ["first_name", "last_name", "email"], // Lấy thông tin user liên quan
        },
        {
          model: models.Role,
          attributes: ["name"],
        },
      ],
    });
    const formatMembers = members.map(item => ({
      first_name: item.User.first_name,
      last_name: item.User.last_name,
      full_name: `${item.User.first_name} ${item.User.last_name}`,
      email: item.User.email,
      role: item.Role.name
    }));
    // Render trang administration với dữ liệu members
    res.render("administration", {
      layout: "main_layout",
      members: formatMembers,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).send("An error occurred while fetching members.");
  }
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
