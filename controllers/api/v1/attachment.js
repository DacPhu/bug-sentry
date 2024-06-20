"use strict";

const controller = {};
const models = require("../../../models");
const fs = require("fs");
const path = require("path");

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

    const { count, rows: attachments } =
      await models.Attachment.findAndCountAll({
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

    if (!attachments || attachments.length === 0) {
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

controller.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const attachment_name = req.body.name;
    const project_id = req.session.projectId;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadDir = path.join(__dirname, "private/attachment/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    const attachment = await models.Attachment.create({
      project_id: project_id,
      name: attachment_name,
      path: filePath,
      type: file.mimetype,
    });
    return res.status(200).json({ message: "File uploaded successfully", attachment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
