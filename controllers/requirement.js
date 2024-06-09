"use strict";

const controller = {};
const { inc } = require("../helpers");
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
    const pageType = req.query.pageType??0;
    const { page, size, offset } = paginate(req, 1, 5);
    const requirement = await models.Requirement.findOne({
      where: {
        id: requirementId,
        project_id: projectId
      },
      include: [
        {
          model: models.Member,
          include: [
            {
              model: models.User,
              required: false,
            },
          ],
          required: false,
        },
      ]
    });
    const modules = await models.Module.findAll({
      where: {
        project_id: projectId,
        
      }
    });
    // select all test cases have this requirement
    const testCases = await models.TestCase.findAndCountAll({
      include: [
        {
          model: models.Requirement,
          where: {
            id: requirementId
          },
          attributes: []
        },
        {
          model: models.Member,
          include: [
            {
              model: models.User,
              required: false,
              attributes: ['id', 'first_name', 'last_name']
            },
          ],
          required: false,
        },
        
      ],
      limit: size,
      offset: offset,
      subQuery: false,
    });
    const totalPages = Math.ceil(testCases.count / size);

    // map step_count to test case
    for (const testCase of testCases.rows) {
      const steps = JSON.parse(testCase.steps);
      testCase.step_count = steps.length;
    }
    console.log(requirement);
    if (!requirement) {
      return res.status(404).send("Requirement not found");
    }
    res.render("requirement_detail", {
      layout: "main_layout",
      requirement: requirement,
      testCases: testCases.rows,
      pageType: pageType,
      page: page,
      modules: modules,
      totalPages: totalPages,
      size: size
    });
  } catch (error) {
    console.error("Error fetching requirement:", error);
    res.status(500).send("An error occurred while fetching requirement.");
  }
}

module.exports = controller;
