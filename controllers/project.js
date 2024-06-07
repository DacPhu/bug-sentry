"use strict";

const controller = {};
const models = require("../models");

controller.showAll = async (req, res) => {
  try {
    console.log(req.session)
    const projectsWithCounts = await models.Project.findAll({
      where: { project_manager_id: req.session.userId },
      attributes: [
        "id",
        "name",
        "created_at",
        [models.sequelize.fn("COUNT", models.sequelize.col("TestCases.id")), "testcaseCount"],
        [models.sequelize.fn("COUNT", models.sequelize.col("TestRuns.id")), "testrunCount"],
        [models.sequelize.fn("COUNT", models.sequelize.col("Issues.id")), "issueCount"]
      ],
      include: [
        {
          model: models.TestCase,
          attributes: []
        },
        {
          model: models.TestRun,
          attributes: []
        },
        {
          model: models.Issue,
          attributes: []
        }
      ],
      group: ["Project.id", "Project.name", "Project.created_at"]
    });
    
    console.log(projectsWithCounts)

    // Format the result
    const listProjects = projectsWithCounts.map((project) => ({
      id: project.dataValues.id,
      name: project.dataValues.name,
      created_at: project.dataValues.created_at,
      testcaseCount: project.get("testcaseCount"),
      testrunCount: project.get("testrunCount"),
      issueCount: project.get("issueCount") // Added issueCount
    }));
    console.log(listProjects)

    res.render("project", { listProjects })

  } catch (error) {
    throw new Error("Error fetching project list: " + error.message);
  }
}
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
    res.redirect("/project");
  } catch (error) {
    console.error("Error creating project: ", error);
    res.send("Can not create project!");
  }
};

module.exports = controller;
