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
          return sortOrder === "Asc" ? a.id - b.id : b.id - a.id;
        case "CreatedAt":         
          return sortOrder === "Asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
        }
      })
    res.render("issue", {
      layout: "main_layout",
      issues: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).send("An error occurred while fetching issues.");
  }
};

controller.showAllAPI = async (req, res) => {
  try {
    const issues = await models.Issue.findAll({
      attributes: ["id", "name", "project_id", "created_at", "note"],
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    // Render the issue.hbs view and pass the issues data to it
    return res.render("issue", { issues });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
controller.getIssuesByName = async (req, res) => {
  const name = req.query.keyword;

  if (!name) {
    return res.status(400).json({ message: "Name is empty" });
  }

  try {
    const issues = await models.Issue.findAll({
      where: { name },
      attributes: ["id", "name", "project_id", "created_at", "note"],
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    return res.status(200).json({
      issues: issues.map((issue) => ({
        id: issue.id,
        name: issue.name,
        project_id: issue.project_id,
        created_at: issue.created_at,
        note: issue.note,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getIssuesByProjectId = async (req, res) => {
  const project_id = req.query.project_id;

  if (!project_id) {
    return res.status(400).json({ message: "Project Id is empty" });
  }

  try {
    const issues = await models.Issue.findAll({
      where: { project_id },
      attributes: ["id", "name", "project_id", "created_at", "note"],
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    return res.status(200).json({
      issues: issues.map((issue) => ({
        id: issue.id,
        name: issue.name,
        project_id: issue.project_id,
        created_at: issue.created_at,
        note: issue.note,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getIssueById = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Id is empty" });
  }

  try {
    const issue = await models.Issue.findOne({
      where: { id },
      attributes: ["id", "name", "project_id", "created_at", "note"],
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json({
      issue: {
        id: issue.id,
        name: issue.name,
        project_id: issue.project_id,
        created_at: issue.created_at,
        note: issue.note,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllIssues = async (req, res) => {
  try {
    const issues = await models.Issue.findAll({
      attributes: ["id", "name", "project_id", "created_at", "note"],
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    // Return the users array as a JSON response
    return res.status(200).json({
      issues: issues.map((issue) => ({
        id: issue.id,
        name: issue.name,
        project_id: issue.project_id,
        created_at: issue.created_at,
        note: issue.note,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = controller;
