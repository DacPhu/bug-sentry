"use strict";

const controller = {};
const { model } = require("mongoose");
const models = require("../../../models");

controller.getProjects = async (req, res) => {
  const name = req.query.keyword | "";
  const pmId = req.query.project_manager_id | 0;
  const page = parseInt(req.query.page) | 1;
  const size = parseInt(req.query.size) | 0;

  try {
    let whereClause = {};

    whereClause = {
      [models.Sequelize.Op.and]: [
        { name: { [models.Sequelize.Op.like]: `%${name}%` } },
        { project_manager_id: pmId },
      ],
    };

    const limit = size;
    const offset = (page - 1) * size;

    const { count, rows: projects } = await models.Project.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      projects: projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllProjects = async (req, res) => {
  try {
    const projects = await models.Project.findAll();

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    return res.status(200).json({
      projects: projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.addProject = async (req, res) => {
  const { name } = req.body;

  const project_manager_id = req.session.userId;

  if (!project_manager_id || !name) {
    return res.status(400).json({ message: "Missing some fields" });
  }

  try {
    const currentTimestamp = Date.now();

    const project = await models.Project.create({
      name,
      created_at: currentTimestamp,
      project_manager_id: project_manager_id,
      number_of_members: 1,
    });

    const project_id = project.id;

    const member = await models.Member.create({
      project_id: project_id,
      user_id: project_manager_id,
      role_id: 1,
      active: true,
    });

    req.session.projects[member.project_id] = {
      memberId: member.id,
      role: member.role_id,
    };

    res.redirect(`/project/${project_id}/overview`);
  } catch (error) {
    console.error("Error adding project:", error);
    res.send("Can not add project!");
    console.error(error);
  }
};

controller.editProject = async (req, res) => {
  const { id, name } = req.body;

  try {
    const project = await models.Project.findOne({
      where: { id },
    });

    const result = await models.Project.update(
      {
        name,
        created_at: project.created_at,
        project_manager_id,
        number_of_members: project.number_of_members,
      },
      {
        where: { id },
      }
    );

    if (result[0] > 0) {
      res.status(200).send("Project updated successfully");
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    res.status(401).send("Cannot update project!");
    console.error(error);
  }
};

controller.deleteProject = async (req, res) => {
  try {
    await models.Project.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("Project deleted!");
  } catch (error) {
    res.status(401).send("Can not delete project!");
    console.error(error);
  }
};

module.exports = controller;
