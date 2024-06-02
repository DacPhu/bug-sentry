"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.send("Module");
  //   res.render("home", { layout: "home_layout" });
};

module.exports = controller;
