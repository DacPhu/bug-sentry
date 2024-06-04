"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TestRun extends Model {
    static associate(models) {
      TestRun.belongsTo(models.Project, { foreignKey: "project_id" });
      TestRun.belongsTo(models.Member, { foreignKey: "tester_id" });
      TestRun.belongsTo(models.TestCase, { foreignKey: "test_case_id" });

    }
  }

  TestRun.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
     
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },
    {
      sequelize,
      modelName: "TestRun",
      tableName: "test_runs",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id', 'project_id']
        }
      ]
    }
  );

  return TestRun;
};
