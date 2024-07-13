"use strict";

const controller = {};
const models = require("../models");
const path = require("path");
const fs = require('fs');

controller.download_attachment = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await models.Attachment.findOne({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(__dirname, "../private", file.path);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "File not found on server" });
      }

      res.download(filePath, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          return res.status(500).json({ error: "Error downloading file" });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;
