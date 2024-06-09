"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Release extends Model {
    static associate(models) {
      Release.belongsTo(models.Project, { foreignKey: "project_id" });
    }
  }
  Release.init(
    {
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      path: DataTypes.STRING,
      type : DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Attachment",
      tableName: "attachments",
      timestamps: false,
    }
  );

  return Release;
};
