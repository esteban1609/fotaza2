const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Collection = sequelize.define("Collection", {

    name: {

        type: DataTypes.STRING,

        allowNull: false
    }
});

Collection.belongsTo(User);

User.hasMany(Collection);

module.exports = Collection;