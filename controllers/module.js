"use strict";

const controller = {};
const models = require("../models");
controller.showAll = async(req, res) => {
  try {
    const modules = await models.Module.findAll({
      attributes: ["id", "name", "project_id", "created_by", "created_at"],
    });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    res.render("module", {
      modules: modules.map(module => ({
        id: module.id,
        name: module.name,
        project_id: module.project_id,
        created_by: module.created_by,
        created_at: module.created_at,
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
controller.getModulesByName = async (req, res) => {
  const name = req.query.keyword;

  if (!name) {
    return res.status(400).json({ message: "Name is empty" });
  }

  try {
    const modules = await models.Module.findAll({
      where: { name },
      attributes: ["id", "name", "project_id", "created_by", "create_at"],
    });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    return res.status(200).json({
      modules: modules.map((module) => ({
        id: module.id,
        name: module.name,
        project_id: module.project_id,
        created_by: module.created_by,
        created_at: module.created_at,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getModulesByProjectId = async (req, res) => {
  const project_id = req.query.project_id;

  if (!project_id) {
    return res.status(400).json({ message: "Project Id is empty" });
  }

  try {
    const modules = await models.Module.findAll({
      where: { project_id },
      attributes: ["id", "name", "project_id", "created_by", "created_at"],
    });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    return res.status(200).json({
      modules: modules.map((module) => ({
        id: module.id,
        name: module.name,
        project_id: module.project_id,
        created_by: module.created_by,
        created_at: module.created_at,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getModuleById = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Id is empty" });
  }

  try {
    const module = await models.Module.findOne({
      where: { id },
      attributes: ["id", "name", "project_id", "created_by", "created_at"],
    });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    return res.status(200).json({
      module: {
        id: module.id,
        name: module.name,
        project_id: module.project_id,
        created_by: module.created_by,
        created_at: module.created_at,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllModules = async (req, res) => {
  try {
    const modules = await models.Module.findAll({
      attributes: ["id", "name", "project_id", "created_by", "created_at"],
    });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    return res.status(200).json({
      modules: modules.map((module) => ({
        id: module.id,
        name: module.name,
        project_id: module.project_id,
        created_by: module.created_by,
        created_at: module.created_at,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
