"use strict";

const controller = {};
const models = require("../models");
const sequelize = require("sequelize");

controller.showAll = async (req, res) => {
  try {
    // Extract project_id from request parameters
    const projectId = req.params.id;

    // Query the database for requirements with the specified project_id
    const test_runs = await models.TestRun.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: models.Member,
          as: "Creator",
          include: [
            {
              model: models.User,
              attributes: ["first_name", "last_name"], // Exclude attributes from User, since you only need username
              required: false,
            },
          ],
          required: false,
        },
        {
          model: models.Member,
          as: "Assignee",
          include: [
            {
              model: models.User,
              attributes: ["first_name", "last_name"], // Exclude attributes from User, since you only need username
              required: false,
            },
          ],
          required: false,
        },
        {
          model: models.TestCase,
          required: false,
        },
      ],
    });
    console.log(test_runs);
    // console.log(test_runs.map(item => (item.Creator.User, item.Assignee.User)));
    // Render the results using the specified layout
    res.render("testrun", {
      layout: "main_layout",
      test_runs: test_runs,
    });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).send("An error occurred while fetching requirements.");
  }
};

module.exports = controller;
