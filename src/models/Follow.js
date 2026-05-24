const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Follow = sequelize.define("Follow", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }

}, {
    tableName: "follows",
    timestamps: true
});

User.belongsToMany(User, {
    through: Follow,
    as: "Followers",
    foreignKey: "followingId"
});

User.belongsToMany(User, {
    through: Follow,
    as: "Following",
    foreignKey: "followerId"
});

module.exports = Follow;