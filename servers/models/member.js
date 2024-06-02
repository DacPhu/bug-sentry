"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(models.User, { foreignKey: "user_id" });
      Member.belongsTo(models.Project, { foreignKey: "project_id" });

      Member.hasMany(models.Activity, { foreignKey: "member_id" });
      Member.hasMany(models.TestCase, { foreignKey: "tester_id" });
      Member.hasMany(models.TestRun, { foreignKey: "tester_id" });
      Member.hasMany(models.Release, { foreignKey: "created_by" });
      Member.hasMany(models.Module, { foreignKey: "created_by" });

      Member.hasMany(models.Requirement, { foreignKey: "created_by" });
      Member.hasMany(models.Comment, { foreignKey: "member_id" });
      Member.hasMany(models.Board, { foreignKey: "user_id" });
      Member.hasMany(models.Notification, { foreignKey: "user_id" });


    }
  }

  Member.init(
    {
      id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Project',
          key: 'id'
        }
      },
      role_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "members",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'project_id']
        }
      ]
    }
  );

  return Member;
};
