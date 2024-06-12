"use strict";

const controller = {};
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

module.exports = controller;
