const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");
const Post = require("./Post");

const Interest = sequelize.define("Interest");

Interest.belongsTo(User);

Interest.belongsTo(Post);

User.hasMany(Interest);

Post.hasMany(Interest);

module.exports = Interest;