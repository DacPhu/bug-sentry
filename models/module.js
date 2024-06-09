"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Module extends Model {
        static associate(models) {
            Module.belongsTo(models.Project, { foreignKey: "project_id" });
            Module.belongsTo(models.Member, { foreignKey: "created_by", as: "Creator" });
            Module.hasMany(models.TestCase, { foreignKey: "module_id" });
            Module.hasMany(models.Requirement, { foreignKey: "module_id" });

        }
    }

    Module.init(
        {
            name: DataTypes.STRING,
            project_id: { type: DataTypes.INTEGER, allowNull: false },
            created_by: { type: DataTypes.INTEGER, allowNull: false },
            created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        },
        {
            sequelize,
            modelName: "Module",
            tableName: "modules",
            timestamps: false,
        }
    );

    return Module;
};
