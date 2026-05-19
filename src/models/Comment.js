const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Post = require("./Post");

const Comment = sequelize.define("Comment", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: "comments",
    timestamps: true
});

User.hasMany(Comment);

Comment.belongsTo(User, {
    foreignKey: "UserId"
});

Post.hasMany(Comment);

Comment.belongsTo(Post, {
    foreignKey: "PostId"
});

module.exports = Comment;