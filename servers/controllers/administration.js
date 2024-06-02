"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("administration");
};

module.exports = controller;
