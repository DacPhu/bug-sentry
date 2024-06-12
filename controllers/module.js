"use strict";

const controller = {};
const models = require("../models");

controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;

    const modules = await models.Module.findAll({
      where: {
        project_id: projectId,
      },
    });
    console.log(modules);

    res.render("module", {
      layout: "main_layout",
      modules,
    });
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).send("An error occurred while fetching modules.");
  }
};

module.exports = controller;
