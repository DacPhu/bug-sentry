"use strict";

const controller = {};
const models = require("../models");
controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;
    const sortType = req.query.sortType || "CreatedAt"; 
    const sortOrder = req.query.sortOrder || "Asc"; 
    console.log(sortType, sortOrder)
    let issues = await models.Issue.findAll({
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
      ],
    });
    
    issues = issues.sort((a, b) => {
      switch (sortType) {
        case "Priority":
          console.log("HH1")
          return sortOrder === "Asc"
            ? a.priority.localeCompare(b.priority)
            : b.priority.localeCompare(a.priority);
        case "Code":
          console.log("HH2")
          return sortOrder === "Asc" ? a.id - b.id : b.id - a.id;
        case "CreatedAt":
          console.log("HH3")
          return sortOrder === "Asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
        }
      })
      const issuesIdAft = issues.map(item => item.id)
      console.log(issuesIdAft)
    res.render("issue", {
      layout: "main_layout",
      issues: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).send("An error occurred while fetching issues.");
  }
};

module.exports = controller;
