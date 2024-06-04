"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.Project, { foreignKey: "project_id" });
            Comment.belongsTo(models.Member, { foreignKey: "member_id" });
            Comment.belongsTo(models.Issue, { foreignKey: "issue_id" });
        }
    }

    Comment.init(
        {
            content: { type: DataTypes.TEXT, allowNull: false },
            project_id: { type: DataTypes.INTEGER, allowNull: false },
            type: DataTypes.STRING,
            created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            issue_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            sequelize,
            modelName: "Comment",
            tableName: "comments",
            timestamps: false,
        }
    );

    return Comment;
};
