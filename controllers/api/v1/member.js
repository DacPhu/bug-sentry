"use strict";

const controller = {};
const models = require("../../../models");

controller.getMembersInProject = async (req, res) => {
  try {
    const projectId = req.params.id;
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
      role: item.Role.name,
      status: (item.active ? "active" : "inactive"),
    }));
    console.log(formatMembers)
    // Return the users array as a JSON response
    return res.status(200).json(formatMembers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
