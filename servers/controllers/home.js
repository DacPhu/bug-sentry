"use strict";

const controller = {};

controller.showHomePage = (req, res) => {
  res.render("home", { layout: "home_layout" });
};

module.exports = controller;
