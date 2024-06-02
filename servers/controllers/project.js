"use strict";

const controller = {};

controller.showAll = (req, res) => {
  res.render("project");
};

controller.showOverview = (req, res) => {
  res.render("project_overview");
};

controller.createProject = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.render("project", {
      errorMessage: "Please fill all field",
    });
  }

  try {
    res.redirect("project");
  } catch (error) {
    console.error("Error creating project: ", error);
    res.send("Can not create project!");
  }
};

controller.addUser = async (req, res) => {};

controller.removeUser = async (req, res) => {};
controller.editUser = async (req, res) => {};
module.exports = controller;
