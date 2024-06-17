"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class RequirementTestCase extends Model {
        static associate(models) {
            RequirementTestCase.belongsTo(models.Requirement, { foreignKey: "requirement_id" });
            RequirementTestCase.belongsTo(models.TestCase, { foreignKey: "test_case_id" });
        }
    }

    RequirementTestCase.init(
        {
            requirement_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'requirements', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT', // Prevent deletion of Requirement
            },
            test_case_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'test_cases', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT', // Prevent deletion of TestCase
            }
        },
        {
            sequelize,
            modelName: "RequirementTestCase",
            tableName: "requirement_test_cases",
            timestamps: false,
        }
    );

    return RequirementTestCase;
};
