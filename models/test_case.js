"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TestCase extends Model {
    static associate(models) {
      TestCase.belongsTo(models.Project, { foreignKey: "project_id" });
      TestCase.belongsTo(models.Module, { foreignKey: "module_id" });
      TestCase.belongsTo(models.Member, { foreignKey: "tester_id" });
      TestCase.belongsToMany(models.Requirement, {
        through: 'requirement_test_cases',
        foreignKey: 'test_case_id',
        otherKey: 'requirement_id',
        timestamps: false 
      });
      
    }
  }

  TestCase.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      description: DataTypes.TEXT,
      type: DataTypes.STRING,
      priority: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['critical', 'high', 'medium', 'low']] } },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "TestCase",
      tableName: "test_cases",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id', 'project_id']
        }
      ]
    }
  );

  return TestCase;
};
