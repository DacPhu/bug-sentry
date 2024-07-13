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
  const { name, status, priority, note } = req.body;
  const project_id = parseInt(req.session.project_id);
  const member_id = req.session.projects[project_id].memberId
  console.log(name, project_id, status, priority, note, member_id)
  if (!project_id || !name || !status || !priority ) {
    return res.status(400).message({ error: "Missing some fields" });
  }

  try {

    const newIssue = await models.Issue.create({
      name,
      project_id,
      status,
      priority,
      note,
      member_id
    });
    models.Activity.create({
      project_id: project_id,
      user_id: req.session.userId,
      title_name: `Create issue ${name}`,
      member_id: req.session.memberId,
      action: 'create',
      time : new Date()
    });
    console.log('Test Run created:', newIssue.toJSON());
    res.redirect(`/project/${project_id}/issue`)
  } catch (error) {
    console.error("Error adding issue:", error);
    res.send("Can not add issue!");
    console.error(error);
  }
};

controller.editIssue = async (req, res) => {
  const { title, status, priority, note } = req.body;
  const id = req.params.id;
  console.log(title, status, priority, note, id)
  try {
    const issue = await models.Issue.findByPk(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    if (title !== undefined) issue.name = title;
    if (status !== undefined) issue.status = status;
    if (priority !== undefined) issue.priority = priority;
    if (note !== undefined) issue.note = note;
    if (status !== undefined) {
      models.Activity.create({
        project_id: issue.project_id,
        user_id: req.session.userId,
        title_name: `Change issue ${issue.name} status to ${status}`,
        member_id: req.session.memberId,
        action: 'edit',
        time : new Date()
      });
    }
    
    await issue.save();
    console.log('Issue updated:', issue.toJSON());
    return res.status(200).json(issue);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.deleteIssue = async(req, res) => {
  console.log(req.params.id)
  try {
      const issue = await models.Issue.findByPk(req.params.id)
      if (!issue) {
          return res.status(404).send("Issue not found");
      }
      models.Activity.create({
        project_id: issue.project_id,
        user_id: req.session.userId,
        title_name: `Delete issue ${issue.name}`,
        member_id: req.session.memberId,
        action: 'delete',
        time : new Date()
      });
      await issue.destroy();
      req.flash("success", `Delete Issue ${issue.name} successfully!`);
      res.status(204).send();
  } catch (error) {
      return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = controller;
