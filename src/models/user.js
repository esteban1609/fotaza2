const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    }, {
    tableName: "Users",
    
});


module.exports = User;