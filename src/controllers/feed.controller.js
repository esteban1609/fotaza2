const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const feed = async (req, res) => {

    try {

        const posts = await Post.findAll({

            include: [
    User,
    {
        model: Comment,
        include: User
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