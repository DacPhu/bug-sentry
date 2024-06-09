"use strict";

const controller = {};
const models = require("../models");

controller.showAll = async (req, res) => {
  try {
    // Extract project_id from request parameters
    const projectId = req.params.id;

    // Query the database for requirements with the specified project_id
    const test_runs = await models.TestRun.findAll({
      where: {
        project_id: projectId
      },
    });
    console.log(test_runs);
    // Render the results using the specified layout
    res.render("testrun", {
      layout: "main_layout",
      test_runs: test_runs
    });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).send("An error occurred while fetching requirements.");
  }
};

module.exports = controller;
