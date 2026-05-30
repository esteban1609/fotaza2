const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Notification = sequelize.define("Notification", {

    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true
    },

    message: {

        type: DataTypes.STRING,

        allowNull: false
    },

    read: {

        type: DataTypes.BOOLEAN,

        defaultValue: false
    }

}, {

    tableName: "notifications"
});

User.hasMany(Notification);

Notification.belongsTo(User);

module.exports = Notification;