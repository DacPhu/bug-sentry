"use strict";

const controller = {};
const models = require("../models");
const { paginate } = require("../utils/pagination");
controller.showAll = async (req, res) => {
  try {
    // Extract project_id from request parameters
    const projectId = req.params.id;

    // Query the database for requirements with the specified project_id
    const moduleName = req.query.moduleName??'';
    
    const requirementName = req.query.requirementName??'';
    const sortType = req.query.sortType??'asc';
    const sortField = req.query.sortField??'id';
    const { page, size, offset } = paginate(req, 1, 5);

    const modules = await models.Module.findAll({
      where: {
        project_id: projectId,
        name : {
          [models.Sequelize.Op.like]: `%${moduleName}%`
        }
      }
    });
    console.log(page);
    if (modules.length == 0) {
      return res.render("requirement", {
        layout: "main_layout",
        requirements: {rows: [], count: 0}, 
        modules: modules,
        moduleName: moduleName,
        requirementName: requirementName,
        sortType: sortType,
        sortField: sortField,
        page: page,
        totalPages: 0,
        size: size,
        module: null
      });
    }
    const targetModule = req.query.module??modules[0].id;

    const requirements = await models.Requirement.findAndCountAll({
      where: {
        module_id: targetModule,
        name : {
          [models.Sequelize.Op.like]: `%${requirementName}%`
        },
        project_id: projectId
      },
      order: [
        [sortField, sortType]
      ],
      limit: size,
      offset: offset
    });
    const totalPages = Math.ceil(requirements.count / size);
    console.log(requirements);
    
    res.render("requirement", {
      layout: "main_layout",
      requirements: requirements, 
      modules: modules,
      moduleName: moduleName,
      requirementName: requirementName,
      sortType: sortType,
      sortField: sortField,
      page: page,
      size: size,
      totalPages: totalPages,
      module: targetModule
    });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).send("An error occurred while fetching requirements.");
  }
};



controller.getDetailRequirement = async (req, res) => {
  try {
    const projectId = req.params.id;
    const requirementId = req.params.requirement_id;
    const requirement = await models.Requirement.findOne({
      where: {
        id: requirementId,
        project_id: projectId
      }
    });
    if (!requirement) {
      return res.status(404).send("Requirement not found");
    }
    res.render("requirement_detail", {
      layout: "main_layout",
      requirement: requirement
    });
  } catch (error) {
    console.error("Error fetching requirement:", error);
    res.status(500).send("An error occurred while fetching requirement.");
  }
}

module.exports = controller;
