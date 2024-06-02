"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("activity_log");
};

module.exports = controller;
