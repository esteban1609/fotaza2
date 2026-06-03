const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Post = require("./Post");

const Report = sequelize.define("Report", {

    reason: {

        type: DataTypes.STRING,

        allowNull: false
    },

    description: {

        type: DataTypes.TEXT,

        allowNull: false
    }
});


Report.belongsTo(User);

Report.belongsTo(Post);

User.hasMany(Report);

Post.hasMany(Report);

module.exports = Report;