"use strict";

const controller = {};
const models = require("../models");
controller.showAll = async (req, res) => {
  try {
    // Extract project_id from request parameters
    const projectId = req.params.id;

    // Query the database for requirements with the specified project_id
    const requirements = await models.Module.findAll({
      where: {
        project_id: projectId
      },
      include: [
        {
          model: models.Requirement,
        },
        
      ],
    });
    // Render the results using the specified layout
    const modulesJSON = requirements.map(module => module.toJSON());
    for (let i = 0; i < modulesJSON.length; i++) {
      modulesJSON[i].requirements = modulesJSON[i].Requirements;
      delete modulesJSON[i].Requirements;
    }
    res.render("requirement", {
      layout: "main_layout",
      requirements: JSON.stringify(modulesJSON), 
    });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).send("An error occurred while fetching requirements.");
  }
};

module.exports = controller;
