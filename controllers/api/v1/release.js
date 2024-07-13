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
  const project_id = parseInt(req.session.projectId);
  const name = req.body.name;
  const start_date = req.body.startDate;
  const end_date = req.body.endDate;
  const description = req.body.description;
  const created_by = req.session.memberId;
  const created_at = currentTimestamp;

  if (!name) {
    return res.status(400).json({ message: "Missing some fields" });
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

    res.redirect(`/project/${project_id}/release`);
  } catch (error) {
    console.error("Error adding release:", error);
    res.send("Can not add release!");
  }
};

controller.editRelease = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const start_date = req.body.startDate;
  const end_date = req.body.endDate;
  const description = req.body.description;
  console.log(id, name, start_date, end_date, description)

  try {
    const release = await models.Release.findByPk(id);

    release.name = name;
    release.start_date = start_date;
    release.end_date = end_date;
    release.description = description;

    await release.save();
    return res.status(200).send("Release updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(401).send("Cannot update release!");
  }
};

controller.deleteRelease = async (req, res) => {
  try {
    const release = await models.Release.findByPk(req.params.id);
    if (!release) {
      return res.status(404).send("Release not found");
    }
    await release.destroy();
    req.flash("success", `Delete release ${release.name} successfully!`);
    res.status(200).send("Release deleted successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
