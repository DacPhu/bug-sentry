"use strict";

const controller = {};
const models = require("../models");

controller.getReleasesByName = async (req, res) => {
  const name = req.query.keyword;

  if (!name) {
    return res.status(400).json({ message: "Name is empty" });
  }

  try {
    const releases = await models.Release.findAll({
      where: { name },
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

controller.getReleasesByProjectId = async (req, res) => {
  const project_id = req.query.project_id;

  if (!project_id) {
    return res.status(400).json({ message: "Project Id is empty" });
  }

  try {
    const releases = await models.Release.findAll({
      where: { project_id },
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

controller.getReleaseById = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "Id is empty" });
  }

  try {
    const release = await models.Release.findOne({
      where: { id },
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

    if (!release) {
      return res.status(404).json({ message: "Release not found" });
    }

    return res.status(200).json({
      release: {
        id: release.id,
        project_id: release.project_id,
        name: release.name,
        start_date: release.start_date,
        end_date: release.end_date,
        description: release.description,
        created_by: release.created_by,
        created_at: release.created_at,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

controller.getAllReleases = async (req, res) => {
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
