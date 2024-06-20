"use strict";

const controller = {};
const models = require("../models");

controller.showEditProfileForm = async (req, res) => {
  res.render("editProfile");
};

controller.showEditPasswordForm = async (req, res) => {
  res.render("editPassword");
};

module.exports = controller;
