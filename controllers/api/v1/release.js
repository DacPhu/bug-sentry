"use strict";

const controller = {};
const models = require("../../../models");

const currentTimestamp = new Date();

controller.getReleases = async (req, res) => {
  const name = req.query.keyword | "";
  const type = req.query.type | "open";
  const projectId = req.query.projectId | 0;
  const page = parseInt(req.query.page) | 1;
  const size = parseInt(req.query.size) | 0;

  try {
    let whereClause = {};

    whereClause = {
      [models.Sequelize.Op.and]: [
        { name: { [models.Sequelize.Op.like]: `%${name}%` } },
        { project_id: projectId },
        {
          [models.Sequelize.Op.or]: [
            type === "open"
              ? {
                  start_date: { [models.Sequelize.Op.lte]: currentTimestamp },
                  end_date: { [models.Sequelize.Op.gte]: currentTimestamp },
                }
              : null,
            type === "completed"
              ? {
                  end_date: { [models.Sequelize.Op.lt]: currentTimestamp },
                }
              : null,
            type === "upcoming"
              ? {
                  start_date: { [models.Sequelize.Op.gt]: currentTimestamp },
                }
              : null,
          ].filter((condition) => condition !== null), // Remove null values from array
        },
      ],
    };

    const limit = size;
    const offset = (page - 1) * size;

    const { count, rows: releases } = await models.Release.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    if (!releases || releases.length === 0) {
      return res.status(404).json({ message: "No releases found" });
    }

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      releases: releases,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllReleases = async (req, res) => {
  try {
    const releases = await models.Release.findAll();

    if (!releases || releases.length === 0) {
      return res.status(404).json({ message: "No releases found" });
    }

    return res.status(200).json({
      releases: releases,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.addRelease = async (req, res) => {
  const {
    project_id,
    name,
    start_date,
    end_date,
    description,
    created_by,
    created_at,
  } = req.body;

  if (!project_id || !name || !created_by || !created_at) {
    return res.render("user-management", {
      errorMessage:
        "Project Id, Name, Created By, Created At fields are required.",
    });
  }

  try {
    await models.Release.create({
      project_id,
      name,
      start_date,
      end_date,
      description,
      created_by,
      created_at,
    });

    res.redirect("/:${project_id}/release");
  } catch (error) {
    console.error("Error adding release:", error);
    res.send("Can not add release!");
    console.error(error);
  }
};

controller.editRelease = async (req, res) => {
  const {
    id,
    project_id,
    name,
    start_date,
    end_date,
    description,
    created_by,
    created_at,
  } = req.body;

  try {
    const result = await models.Release.update(
      {
        project_id,
        name,
        start_date,
        end_date,
        description,
        created_by,
        created_at,
      },
      {
        where: { id },
      }
    );

    if (result[0] > 0) {
      res.status(200).send("Release updated successfully");
    } else {
      res.status(404).send("Release not found");
    }
  } catch (error) {
    res.status(401).send("Cannot update release!");
    console.error(error);
  }
};

controller.deleteRelease = async (req, res) => {
  try {
    await models.Release.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("Release deleted!");
  } catch (error) {
    res.status(401).send("Can not delete release!");
    console.error(error);
  }
};

module.exports = controller;
