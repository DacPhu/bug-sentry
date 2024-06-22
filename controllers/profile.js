"use strict";

const controller = {};
const models = require("../models");

controller.showEditProfileForm = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await models.User.findByPk(userId);
    console.log(user);
    res.render("editProfile", { user });
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
