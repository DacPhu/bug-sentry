"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    static associate(models) {
      Issue.belongsTo(models.Project, { foreignKey: "project_id" });
      Issue.hasMany(models.Comment, { foreignKey: "issue_id" });
      Issue.belongsTo(models.Member, { foreignKey: "member_id" });
    
    }
  }

  Issue.init(
    {
      name: DataTypes.STRING,
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Issue",
      tableName: "issues",
      timestamps: false,
    }
  );

  return Issue;
};
