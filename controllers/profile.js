"use strict";

const controller = {};
const models = require("../models");

controller.showEditProfileForm = async (req, res) => {
  const userId = req.session.userId;
  console.log(req);

  try {
    const user = await models.User.findByPk(userId);
    console.log("____________USER", user);
    let role_name = "Project manager";
    if (user.role_id == 2) {
      role_name = "Tester";
    } else if (user.role_id == 1) {
      role_name = "Developer";
    }
    res.render("editProfile", { user, role_name });
  } catch (error) {
    console.error(error);
  }
};

controller.showEditPasswordForm = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await models.User.findByPk(userId);
    console.log(user);
    res.render("editPassword", { user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = controller;
