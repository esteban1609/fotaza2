const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");

const feed = async (req, res) => {

    try {

        const posts = await Post.findAll({

            include: [
    User,
    {
        model: Comment,
        include: User
    },
    {
        model: Rating
    }
],

            order: [
                ["createdAt", "DESC"]
            ]
        });

        res.render("feed", {
            posts
        });

    } catch (error) {

        console.error(error);

        res.send("Error cargando publicaciones");
    }
};

module.exports = {
    feed
};