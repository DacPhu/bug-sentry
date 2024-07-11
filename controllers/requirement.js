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
    const moduleName = req.query.moduleName ?? '';

    const requirementName = req.query.requirementName ?? '';
    const sortType = req.query.sortType ?? 'asc';
    const sortField = req.query.sortField ?? 'id';
    const { page, size, offset } = paginate(req, 1, 5);

    const modules = await models.Module.findAll({
      where: {
        project_id: projectId,
        name: {
          [models.Sequelize.Op.like]: `%${moduleName}%`
        }
      }
    });
    console.log(page);
    if (modules.length == 0) {
      return res.render("requirement", {
        layout: "main_layout",
        requirements: { rows: [], count: 0 },
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
    const targetModule = req.query.module ?? modules[0].id;

    const requirements = await models.Requirement.findAndCountAll({
      where: {
        module_id: targetModule,
        name: {
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
    const pageType = req.query.pageType ?? 0;
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



controller.createRequirement = async (req, res) => {
  try {
    const projectId = req.params.id;
    const module_id = req.body.module_id;
    const name = req.body.name;
    const description = req.body.description ?? '';
    const url = req.body.url ?? '';
    console.log(req.session);
    const requirement = await models.Requirement.create({
      project_id: projectId,
      module_id: module_id,
      name: name,
      description: description,
      url,
      created_by: req.session.memberId
    });

    
    models.Activity.create({
      project_id: projectId,
      user_id: req.session.userId,
      title_name: `Create requirement ${requirement.name}`,
      member_id: req.session.memberId,
      action: 'create',
      time : new Date()
    });



    req.flash("success", `Create requirement ${requirement.name} successfully!`);
    res.redirect(`/project/${projectId}/requirement`);
  } catch (error) {
    console.error("Error creating requirement:", error);
    req.flash("error", "An error occurred while creating requirement.");
    res.status(500).send("An error occurred while creating requirement.");
  }
}

controller.editRequirement = async (req, res) => {
  try {
    const id = req.body.id;
    var projectId = req.params.id;
    const name = req.body.name;
    const description = req.body.description ?? '';
    const url = req.body.url ?? '';
    if (name.trim() === '') {
      req.flash("error", "Name is required");
      return res.redirect(`/project/${projectId}/requirement`);
    }
    const requirement = await models.Requirement.findOne({
      where: {
        id: id,
        project_id: projectId
      }
    });
    
    if (!requirement) {
      return res.status(404).send("Requirement not found");
    }
    requirement.name = name;
    requirement.description = description;
    requirement.url = url;
    await requirement.save();

    models.Activity.create({
      project_id: projectId,
      user_id: req.session.userId,
      title_name: `Edit requirement ${requirement.name}`,
      member_id: req.session.memberId,
      action: 'edit',
      time : new Date()
    });
    req.flash("success", `Edit requirement ${requirement.name} successfully!`);
    res.redirect(`/project/${projectId}/requirement`);
  } catch (error) {
    console.error("Error creating requirement:", error);
    req.flash("error", "An error occurred while editting requirement.");
    res.redirect(`/project/${projectId}/requirement`);
  }
}


controller.deleteRequirement = async (req, res) => {
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
    await requirement.destroy();


    models.Activity.create({
      project_id: projectId,
      user_id: req.session.userId,
      title_name: `Delete requirement ${requirementId}`,
      member_id: req.session.memberId,
      action: 'delete',
      time : new Date()
    });


    req.flash("success", `Delete requirement ${requirement.name} successfully!`);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting requirement:", error);
    req.flash("error", "An error occurred while deleting requirement.");
    res.status(500).send("An error occurred while deleting requirement.");
  }
}

controller.addLinkedTestCasesAPI = async (req, res) => {
  try {
    const { id: projectId, requirement_id: requirementId } = req.params;
    const { testcases } = req.body;
    if (!testcases || !Array.isArray(testcases) || testcases.length === 0) {
      return res.status(400).json({ error: 'Invalid test cases' });
    }


    const requirement = await models.Requirement.findOne({
      where: {
        id: requirementId,
        project_id: projectId
      }
    });

    if (!requirement) {
      return res.status(404).json({ error: 'Requirement not found' });
    }

    const testCaseInstances = await models.TestCase.findAll({
      where: {
        id: testcases
      }
    });

    if (testCaseInstances.length !== testcases.length) {
      return res.status(404).json({ error: 'Some test cases not found' });
    }

    // Link test cases to the requirement by requirement_test_cases table
    await requirement.addTestCases(testCaseInstances);
    console.log("done add",requirement.addTestCases);


    
    models.Activity.create({
      project_id: projectId,
      user_id: req.session.userId,
      title_name: `Link test case ${JSON.stringify(testcases)} to requirement ${requirementId}`,
      member_id: req.session.memberId,
      action: 'create',
      time : new Date()
    });



    res.status(200).json({ message: 'Linked test cases successfully'});
  } catch (error) {
    console.error("Error add linked testcases:", error);
    res.status(500).send("An error occurred while fetching linked testcases.");
  }
}


controller.removeLinkedTestCaseAPI = async (req, res) => {
  try {
    const { id: projectId, requirement_id: requirementId, testcase_id } = req.params;
    const requirementTestCase = await models.RequirementTestCase.findOne({
      where: {
        requirement_id: requirementId,
        test_case_id: testcase_id
      }
    });

    if (!requirementTestCase) {
      return res.status(404).json({ error: 'Test case not linked to requirement' });
    }

    await requirementTestCase.destroy();


    models.Activity.create({
      project_id: projectId,
      user_id: req.session.userId,
      title_name: `Unlink test case ${testcase_id} from requirement ${requirementId}`,
      member_id: req.session.memberId,
      action: 'delete',
      time : new Date()
    });


    res.status(204).send();
  } catch (error) {
    console.error("Error unlink test case:", error);
    res.status(500).send("An error occurred while unlinking test case.");
  }
}


module.exports = controller;
