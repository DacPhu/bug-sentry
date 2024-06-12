"use strict";

const controller = {};
const models = require("../../../models");

controller.getIssues = async (req, res) => {
  const name = req.query.keyword | "";
  const projectId = req.query.projectId | 0;
  const page = parseInt(req.query.page) | 1;
  const size = parseInt(req.query.size) | 0;

  try {
    let whereClause = {};

    whereClause = {
      [models.Sequelize.Op.and]: [
        { name: { [models.Sequelize.Op.like]: `%${name}%` } },
        { project_id: projectId },
      ],
    };

    const limit = size;
    const offset = (page - 1) * size;

    const { count, rows: issues } = await models.Issue.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      issues: issues,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllIssues = async (req, res) => {
  try {
    const issues = await models.Issue.findAll({});

    if (!issues || issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    return res.status(200).json({
      issues: issues,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.addIssue = async (req, res) => {
  const { name, project_id, status, priority, note } = req.body;

  if (!project_id || !name || !status || !priority || !note) {
    return res.status(400).message({ error: "Missing some fields" });
  }

  try {
    const currentTimestamp = Date.now();

    await models.Issue.create({
      name,
      project_id,
      status,
      priority,
      currentTimestamp,
      note,
    });

    res.redirect("project/:${project_id}/issue");
  } catch (error) {
    console.error("Error adding issue:", error);
    res.send("Can not add issue!");
    console.error(error);
  }
};

controller.editIssue = async (req, res) => {
  const { id, name, status, priority, note } = req.body;

  try {
    const issue = await models.Issue.findOne({
      where: { id },
    });
    const result = await models.Issue.update(
      {
        name,
        project_id,
        status,
        priority,
        create_at: issue.create_at,
        note,
      },
      {
        where: { id },
      }
    );

    if (result[0] > 0) {
      res.status(200).send("Issue updated successfully");
    } else {
      res.status(404).send("Issue not found");
    }
  } catch (error) {
    res.status(401).send("Cannot update issue!");
    console.error(error);
  }
};

controller.deleteIssue = async (req, res) => {
  try {
    await models.Issue.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("Issue deleted!");
  } catch (error) {
    res.status(401).send("Can not delete issue!");
    console.error(error);
  }
};

module.exports = controller;
