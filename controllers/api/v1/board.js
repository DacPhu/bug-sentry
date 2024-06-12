"use strict";

const controller = {};
const models = require("../../../models");

controller.getBoards = async (req, res) => {
    const name = req.query.keyword | "";
    const createdBy = req.query.createdBy | 0;
    const page = parseInt(req.query.page) | 1;
    const size = parseInt(req.query.size) | 0;
  
    try {
      let whereClause = {};
  
      whereClause = {
        [models.Sequelize.Op.and]: [
          { name: { [models.Sequelize.Op.like]: `%${name}%` } },
          { user_id: createdBy },
        ],
      };
  
      const limit = size;
      const offset = (page - 1) * size;
  
      const { count, rows: boards } = await models.Board.findAndCountAll({
        where: whereClause,
        limit,
        offset,
      });
  
      if (!boards || boards.length === 0) {
        return res.status(404).json({ message: "No boards found" });
      }
  
      return res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        boards: boards,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
controller.getAllBoards = async (req, res) => {
    try {
        const boards = await models.Board.findAll();

        if (!boards || boards.length === 0) {
        return res.status(404).json({ message: "No boards found" });
        }

        return res.status(200).json({
            boards: boards,
        });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};

module.exports = controller;
