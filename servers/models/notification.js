"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            Notification.belongsTo(models.Member, { foreignKey: "member_id" });
            Notification.belongsTo(models.Project, { foreignKey: "project_id" });

        }
    }

    Notification.init(
        {
            name: DataTypes.STRING,
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            project_id: { type: DataTypes.INTEGER, allowNull: false },
            content: DataTypes.TEXT,
            time: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        },
        {
            sequelize,
            modelName: "Notification",
            tableName: "notifications",
            timestamps: false,
        }
    );

    return Notification;
};
