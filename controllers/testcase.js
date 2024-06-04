"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("testcase");
  //   res.render("home", { layout: "home_layout" });
};

module.exports = controller;
