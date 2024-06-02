"use strict";

const controller = {};

controller.showDashBoard = (req, res) => {
  res.render("main");
};

module.exports = controller;
