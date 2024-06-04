"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("board");
};

module.exports = controller;
