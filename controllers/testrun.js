"use strict";

const controller = {};
const models = require("../models");
const sequelize = require("sequelize");

controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;

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
              attributes: ["first_name", "last_name"], 
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

    res.render("testrun", {
      layout: "main_layout",
      test_runs: test_runs,
    });
  } catch (error) {
    console.error("Error fetching test runs:", error);
    res.status(500).send("An error occurred while fetching test runs.");
  }
};

module.exports = controller;
