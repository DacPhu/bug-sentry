"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.send("Test case");
  //   res.render("home", { layout: "home_layout" });
};

module.exports = controller;
