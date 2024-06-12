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

  if (!firstName || !lastName || !username) {
    return res.render("user-management", {
      errorMessage: "First name, last name, and email are required.",
    });
  }

  try {
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    });

    res.redirect("/users");
  } catch (error) {
    console.error("Error adding user:", error);
    res.send("Can not add user!");
    console.error(error);
  }
};

controller.editRelease = async (req, res) => {
  let { id, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    console.log(id, firstName, lastName, mobile, isAdmin);
    const result = await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false,
      },
      {
        where: { id },
      }
    );
    if (result[0] > 0) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(401).send("cannot update user!");
    console.error(error);
  }
};

controller.deleteRelease = async (req, res) => {
  try {
    await models.User.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("User deleted!");
  } catch (error) {
    res.status(401).send("Can not delete user!");
    console.error(error);
  }
};

module.exports = controller;
