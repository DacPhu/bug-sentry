"use strict";

const controller = {};

const { Attachment } = require("../models");

controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;
    const attachments = await Attachment.findAll({
      where: {
        project_id: projectId
      },
    });
    res.render("attachment", {
      layout: "main_layout",
      attachments: attachments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = controller;
