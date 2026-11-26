
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Collection = require("./Collection");
const Post = require("./Post");

const CollectionPost = sequelize.define("CollectionPost", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: "collection_posts",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["CollectionId", "PostId"]
        }
    ]
});

CollectionPost.belongsTo(Collection);
Collection.hasMany(CollectionPost);

CollectionPost.belongsTo(Post);
Post.hasMany(CollectionPost);

module.exports = CollectionPost;
