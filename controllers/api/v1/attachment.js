"use strict";

const controller = {};
const models = require("../../../models");

controller.getAttachments = async (req, res) => {
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
  
      const { count, rows: attachments } = await models.Attachment.findAndCountAll({
        where: whereClause,
        limit,
        offset,
      });
  
      if (!attachments || attachments.length === 0) {
        return res.status(404).json({ message: "No attachments found" });
      }
  
      return res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        attachments: attachments,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
controller.getAllAttachments = async (req, res) => {
    try {
        const attachments = await models.Attachment.findAll();

        if (!attachments|| attachments.length === 0) {
        return res.status(404).json({ message: "No attachments found" });
        }

        return res.status(200).json({
            attachments: attachments,
        });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};

module.exports = controller;
