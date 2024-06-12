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

module.exports = controller;
