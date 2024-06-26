"use strict";

const controller = {};
const { model } = require("mongoose");
const models = require("../models");

controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;

    const activities = await models.Activity.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: models.Member,
          as: "Actor",
          include: [
            {
              model: models.User,
              attributes: ["first_name", "last_name"], 
              required: false,
              include: [{ model: models.Role }],
            },
          ],
          required: false,
        },
      ],
    });
    const members = await models.Member.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: models.User,
          attributes: ["first_name", "last_name"], 
          required: false,
          include: [{ model: models.Role }],
        },
      ],
    })
    res.render("activity_log", {
      layout: "main_layout",
      activities,
      role: req.session.role,
      members,
    });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).send("An error occurred while fetching activity logs.");
  }
};

module.exports = controller;
