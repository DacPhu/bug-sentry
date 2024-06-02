"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("project");
};

controller.showOverview = (req, res) => {
  res.render("project_overview");
};

module.exports = controller;
