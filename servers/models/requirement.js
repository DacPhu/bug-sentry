"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    static associate(models) {
      Requirement.belongsTo(models.Project, { foreignKey: "project_id" });
      Requirement.belongsTo(models.Member, { foreignKey: "created_by" });
      Requirement.belongsToMany(models.TestCase, {
        through: 'RequirementTestCase',
        foreignKey: 'requirement_id',
        otherKey: 'test_case_id'
      });
    }
  }

  Requirement.init(
    {
      name: DataTypes.STRING,
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      destination_url: { type: DataTypes.STRING, allowNull: false },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "Requirement",
      tableName: "requirements",
      timestamps: false,
    }
  );

  return Requirement;
};
