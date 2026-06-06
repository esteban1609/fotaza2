const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Post = require("./Post");

const Collection = require("./Collection");

const Favorite = sequelize.define("Favorite", {

    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true
    }

}, {

    tableName: "favorites"
});

User.belongsToMany(Post, {

    through: Favorite,

    as: "Favorites"
});

Post.belongsToMany(User, {

    through: Favorite
});

Favorite.belongsTo(Collection);

Collection.hasMany(Favorite);

Favorite.belongsTo(Post);

Post.hasMany(Favorite);

module.exports = Favorite;