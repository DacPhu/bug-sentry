"use strict";

const controller = {};
const { create } = require("connect-mongo");
const models = require("../../../models");

controller.getModules = async (req, res) => {
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

    const { count, rows: modules } = await models.Module.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
    }

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      modules: modules,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllModules = async (req, res) => {
  try {
    const modules = await models.Module.findAll();

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found" });
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

controller.addModule = async (req, res) => {
  const { name, projectId } = req.body;

  const createdBy = req.session.memberId;
  console.log("PROJECT", projectId);

  if (!projectId || !name || !createdBy) {
    return res.status(400).json({ message: "Missing some fields" });
  }

  try {
    await models.Module.create({
      name: name,
      project_id: projectId,
      created_by: createdBy,
    });

    res.redirect(`/project/${projectId}/module`);
  } catch (error) {
    console.error("Error adding module:", error);
    res.send("Can not add module!");
  }
};

controller.editModule = async (req, res) => {
  const { name, projectId } = req.body;

  const id = req.params.id;
  const createdBy = req.session.userId;

  if (!name) return res.status(404).json({ message: "Missing some fixed!" });

  try {
    const module = await models.Module.findByPk(id);

    module.name = name;
    await module.save();
    res.status(200).send("Module updated successfully");
  } catch (error) {
    res.status(401).send("Cannot update module!");
    console.error(error);
  }
};

controller.deleteModule = async (req, res) => {
  try {
    const module = await models.Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).send("Module not found");
    }
    await module.destroy();
    req.flash("success", `Delete module ${module.name} successfully!`);
    res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
