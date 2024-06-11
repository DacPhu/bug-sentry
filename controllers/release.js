"use strict";

const controller = {};
const models = require("../models");

const currentTimestamp = new Date();

controller.showAll = async (req, res) => {
  const type = req.query.type | "open";

  try {
    const whereClauseOpen = {
      [models.Sequelize.Op.and]: [
        { start_date: { [models.Sequelize.Op.lt]: `%${currentTimestamp}%` } },
        { end_date: { [models.Sequelize.Op.gt]: `%${currentTimestamp}%` } },
      ],
    };
    const whereClauseCompleted = {
      [models.Sequelize.Op.and]: [
        { start_date: { [models.Sequelize.Op.lt]: `%${currentTimestamp}%` } },
        { end_date: { [models.Sequelize.Op.lt]: `%${currentTimestamp}%` } },
      ],
    };
    const whereClauseUpcoming = {
      [models.Sequelize.Op.and]: [
        { start_date: { [models.Sequelize.Op.gt]: `%${currentTimestamp}%` } },
        { end_date: { [models.Sequelize.Op.gt]: `%${currentTimestamp}%` } },
      ],
    };

    const releasesOpen = await models.Release.findAll({
      where: whereClauseOpen,
    });

    const releasesUpcoming = await models.Release.findAll({
      where: whereClauseUpcoming,
    });

    const releasesCompleted = await models.Release.findAll({
      where: whereClauseCompleted,
    });
    let releases = [];
    if (type == "open") {
      releases = releasesOpen;
    } else if (type == "completed") {
      releases = releasesCompleted;
    } else {
      releases = releasesUpcoming;
    }

    res.render("release", {
      releases,
      type,
      releasesOpen,
      releasesCompleted,
      releasesUpcoming,
      countOpen: releasesOpen.length,
      countCompleted: releasesCompleted.length,
      countUpcoming: releasesUpcoming.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getReleasesAPI = async (req, res) => {
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

controller.getAllReleasesAPI = async (req, res) => {
  try {
    const releases = await models.Release.findAll({
      attributes: [
        "id",
        "project_id",
        "name",
        "start_date",
        "end_date",
        "description",
        "created_by",
        "created_at",
      ],
    });

    if (!releases || releases.length === 0) {
      return res.status(404).json({ message: "No releases found" });
    }

    return res.status(200).json({
      releases: releases.map((release) => ({
        id: release.id,
        project_id: release.project_id,
        name: release.name,
        start_date: release.start_date,
        end_date: release.end_date,
        description: release.description,
        created_by: release.created_by,
        created_at: release.created_at,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = controller;
