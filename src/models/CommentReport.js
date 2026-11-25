
const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");
const Comment = require("./Comment");

const CommentReport = sequelize.define("CommentReport", {

    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: "comment_reports",
    timestamps: true
});

// Usuario que realiza la denuncia
CommentReport.belongsTo(User, {
    foreignKey: "UserId"
});

User.hasMany(CommentReport, {
    foreignKey: "UserId"
});

// Comentario denunciado
CommentReport.belongsTo(Comment, {
    foreignKey: "CommentId"
});

Comment.hasMany(CommentReport, {
    foreignKey: "CommentId"
});

module.exports = CommentReport;
