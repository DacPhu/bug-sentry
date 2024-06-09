"use strict";

const controller = {};
const models = require("../models");

const currentTimestamp = new Date();

controller.showAll = async (req, res) => {
  res.render("release");
};

controller.getReleasesAPI = async (req, res) => {
  const name = req.query.keyword | "";
  const type = req.query.type | "open";
  const projectId = req.query.projectId | 1;
  const page = parseInt(req.query.page) | 1;
  const size = parseInt(req.query.size) | 0;

  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [
        { name: { [Op.like]: `%${name}%` } },
        { project_id: projectId },
        {
          [Op.or]: [
            type === "open"
              ? {
                  start_date: { [Op.lte]: currentTimestamp },
                  end_date: { [Op.gte]: currentTimestamp },
                }
              : null,
            type === "completed"
              ? {
                  end_date: { [Op.lt]: currentTimestamp },
                }
              : null,
            type === "upcoming"
              ? {
                  start_date: { [Op.gt]: currentTimestamp },
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
