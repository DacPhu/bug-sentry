"use strict";

const controller = {};

controller.showHomePage = (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect("/project");
  }
  res.render("home", { layout: "home_layout" });
};

module.exports = controller;
