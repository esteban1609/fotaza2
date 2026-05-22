const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const User = require("./User");

const Post = require("./Post");

const Rating = sequelize.define("Rating", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
},
{
    tableName: "ratings",
    timestamps: true
});

User.hasMany(Rating)


Rating.belongsTo(User,{
    foreignKey: "UserId"
});


Post.hasMany(Rating)


Rating.belongsTo(Post,{
    foreignKey: "PostId"
});


module.exports = Rating;