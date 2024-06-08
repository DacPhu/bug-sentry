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
        [models.sequelize.fn("COUNT", models.sequelize.fn("DISTINCT", models.sequelize.col("TestCases.id"))), "testcaseCount"],
        [models.sequelize.fn("COUNT", models.sequelize.fn("DISTINCT", models.sequelize.col("TestRuns.id"))), "testrunCount"],
        [models.sequelize.fn("COUNT", models.sequelize.fn("DISTINCT", models.sequelize.col("Issues.id"))), "issueCount"]
      ],
      include: [
        {
          model: models.TestCase,
          attributes: [],
          required: true 
        },
        {
          model: models.TestRun,
          attributes: [],
          required: true 
        },
        {
          model: models.Issue,
          attributes: [],
          required: true 
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
controller.showOverview = async (req, res) => {
  const id = req.params.id
  const project = await models.Project.findOne({
    where: { id: id }
  })
  const testCases = await models.TestCase.findAll({
    where: { project_id: id}
  })
  const testRuns = await models.TestRun.findAll({
    where: { project_id: id}
  })
  const issues = await models.Issue.findAll({
    where: { project_id: id}
  })
  const releases = await models.Release.findAll({
    where: { project_id: id}
  })
  const FormatProject = {
    id: project.id,
    name: project.name,
    created_at: project.created_at,
    number_of_members: project.number_of_members,
  };
  console.log(FormatProject)
  const FormatReleases = releases.map((release) => ({
    id: release.dataValues.id,
    name: release.dataValues.name
  }))
  const FormatTestCases = testCases.map((testcase) => ({
    id: testcase.dataValues.id,
    name: testcase.dataValues.title
  }))
  const FormatTestRuns = testRuns.map((testrun) => ({
    id: testrun.dataValues.id,
    name: testrun.dataValues.name
  }))
  const FormatIssues = issues.map((issue) => ({
    id: issue.dataValues.id,
    name: issue.dataValues.name
  }))

  res.render("project_overview", {FormatProject, FormatReleases, FormatTestCases, FormatTestRuns, FormatIssues});
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
