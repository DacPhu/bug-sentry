"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    static associate(models) {
      Requirement.belongsTo(models.Project, { foreignKey: "project_id" });
      Requirement.belongsTo(models.Member, { foreignKey: "created_by" });
      Requirement.belongsTo(models.Module, { foreignKey: 'module_id' })
      Requirement.belongsToMany(models.TestCase, {
        through: 'requirement_test_cases',
        foreignKey: 'requirement_id',
        otherKey: 'test_case_id',
        timestamps: false 
      });
    }
  }

  Requirement.init(
    {
      name: DataTypes.STRING,
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
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
