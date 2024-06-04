"use strict";

const controller = {};

controller.showAll = (req, res) => {
  // res.send("Issue");
  res.render("issue");
};

module.exports = controller;
