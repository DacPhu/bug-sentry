"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.send("All Project");
};

controller.showOverview = (req, res) => {
  res.render("project_overview");
};

module.exports = controller;
