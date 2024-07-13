"use strict";

const controller = {};
const models = require("../models");
controller.showAll = async (req, res) => {
  try {
    const projectId = req.params.id;
    const sortOrder = req.query.sortOrder || "asc";
    console.log(req.query.sortType)
    const sortTypeMap = {
      "CreatedAt": "created_at",
      "Priority": "priority",
      "Code": "id",
    };

    const sortType = sortTypeMap[req.query.sortType] || "created_at"
    console.log(sortType, sortOrder)
    let orderClause;

    if (sortType === "priority") {
      const priorityOrder = [
        "critical",
        "high",
        "medium",
        "low"
      ];
      orderClause = [
        [models.sequelize.literal(`
          CASE "priority"
            ${priorityOrder.map((priority, index) => `WHEN '${priority}' THEN ${index + 1}`).join("\n")}
            ELSE ${priorityOrder.length + 1}
          END
        `), sortOrder.toUpperCase()]
      ];

    } else {
      orderClause = [
        [sortType, sortOrder.toUpperCase()]
      ];
    }

    let issues = await models.Issue.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: models.Member,
          as: "Creator",
          include: [
            {
              model: models.User,
              attributes: ["first_name", "last_name"],
              required: false,
            },
          ],
          required: false,
        },
      ],
      order: orderClause
    });


    res.render("issue", {
      layout: "main_layout",
      issues: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).send("An error occurred while fetching issues.");
  }
};

module.exports = controller;
