"use strict";

const controller = {};
const models = require("../../../models");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../../../private/attachment/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

    // Define the upload directory
    const uploadDir = path.join(
      __dirname,
      "../../../private/attachment/uploads"
    );

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Define the file path
    const filePath = path.join(uploadDir, file.originalname);

    // Write the file to the upload directory
    fs.writeFileSync(filePath, file.buffer);

    // Calculate the relative path to be stored in the database
    const relativeFilePath = path.relative(
      path.join(__dirname, "../../../private"),
      filePath
    );

    // Create the attachment record in the database with the relative path
    const attachment = await models.Attachment.create({
      project_id: project_id,
      name: attachment_name,
      path: relativeFilePath,
      type: path.extname(file.originalname).substring(1),
    });

    // Redirect to the attachments page
    res.redirect(`/project/${project_id}/attachment`);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.deleteAttachment = async (req, res) => {
  try {
    const id = req.params.id;
    const attachment = await models.Attachment.findByPk(id);

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    fs.unlinkSync(attachment.path);
    await attachment.destroy();
    req.flash("success", `Delete attachment ${attachment.name} successfully!`);
    res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
