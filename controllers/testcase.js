"use strict";

const { paginate } = require("../utils/pagination");
const { inc } = require("../helpers");
const models = require("../models");
const controller = {};

controller.showAll = async (req, res) => {
  try {
    // Extract project_id from request parameters
    const projectId = req.params.id;

    // Query the database for testcases with the specified project_id
    const moduleName = req.query.moduleName??'';
    
    const testcaseName = req.query.testcaseName??'';
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
      return res.render("testcase", {
        layout: "main_layout",
        testcases: {rows: [], count: 0}, 
        modules: modules,
        moduleName: moduleName,
        testcaseName: testcaseName,
        sortType: sortType,
        sortField: sortField,
        page: page,
        totalPages: 0,
        size: size,
        module: null,
        chosenModuleName: ''
      });
    }
    const targetModule = req.query.module??modules[0].id;

    const testcases = await models.TestCase.findAndCountAll({
      where: {
        module_id: targetModule,
        title : {
          [models.Sequelize.Op.like]: `%${testcaseName}%`
        },
        project_id: projectId,
        
      },
      include: [
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
        }
      ],
      order: [
        [sortField, sortType]
      ],
      limit: size,
      offset: offset
    });

  


    const totalPages = Math.ceil(testcases.count / size);
    console.log(testcases);
    for (const testCase of testcases.rows) {
      // const steps = JSON.parse(testCase.steps);
      testCase.steps = JSON.parse(testCase.steps);
      testCase.step_count = testCase.steps.length;
    }
    let chosenModuleName = '';
    for (const module of modules) {
      if (module.id == targetModule) {
        chosenModuleName = module.name;
        break;
      }
    }
    res.render("testcase", {
      layout: "main_layout",
      testcases: testcases.rows, 
      modules: modules,
      moduleName: moduleName,
      testcaseName: testcaseName,
      sortType: sortType,
      sortField: sortField,
      testcasesJson : JSON.stringify(testcases.rows),
      page: page,
      size: size,
      totalPages: totalPages,
      module: targetModule,
      chosenModuleName:chosenModuleName,
    });
  } catch (error) {
    console.error("Error fetching testcases:", error);
    res.status(500).send("An error occurred while fetching testcases.");
  }
};

module.exports = controller;
