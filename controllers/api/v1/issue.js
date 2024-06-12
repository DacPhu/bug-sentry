"use strict";

const controller = {};
const models = require("../models");

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

module.exports = controller;
