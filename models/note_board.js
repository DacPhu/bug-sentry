"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NoteBoard extends Model {
    static associate(models) {
      NoteBoard.belongsTo(models.Board, { foreignKey: "board_id" });
    }
  }

  NoteBoard.init(
    {
      board_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      status : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "NoteBoard",
      tableName: "note_boards",
      timestamps: false,
    }
  );

  return NoteBoard;
};
