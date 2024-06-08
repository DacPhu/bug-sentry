"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Release extends Model {
    static associate(models) {
      Release.belongsTo(models.Project, { foreignKey: "project_id" });
      Release.belongsTo(models.Member, { foreignKey: "created_by" });
    }
  }
  Release.init(
    {
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      description: DataTypes.TEXT,
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "Release",
      tableName: "releases",
      timestamps: false,
    }
  );

  return Release;
};
