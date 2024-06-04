"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.belongsTo(models.User, { foreignKey: "user_id" });
      Board.hasMany(models.NoteBoard, { foreignKey: "board_id" });
    }
  }

  Board.init(
    {
      name: DataTypes.STRING,
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "Board",
      tableName: "boards",
      timestamps: false,
    }
  );

  return Board;
};
