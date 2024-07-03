"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Project.belongsTo(models.User, {
        foreignKey: "project_manager_id",
        as: "projectManager",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      Project.hasMany(models.TestCase, { foreignKey: "project_id" });
      Project.hasMany(models.TestRun, { foreignKey: "project_id" });
      Project.hasMany(models.Issue, { foreignKey: "project_id" });
      Project.hasMany(models.Member, { foreignKey: "project_id" });
    }
  }

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      project_manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      number_of_members: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "projects",
      underscored: true,
      timestamps: false,
    }
  );

  return Project;
};
