const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Post = sequelize.define("Post", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: "posts",
    timestamps: true
});

User.hasMany(Post);

Post.belongsTo(User, {
    foreignKey: "UserId"
});

module.exports = Post;