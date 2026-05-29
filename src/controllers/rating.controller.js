const Rating = require("../models/Rating");

const Post = require("../models/Post");

const createRating = async (req, res) => {

    try {

        const { value } = req.body;

        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (post.UserId === req.session.user.id) {

            req.session.message = {
                type: "warning",
                text: "No podés valorar tu propia publicación"
            };

            return res.redirect("/");
        }

        const existingRating =
            await Rating.findOne({

                where: {
                    UserId: req.session.user.id,
                    PostId: postId
                }
            });

        if (existingRating) {

            req.session.message = {
                type: "info",
                text: "Ya valoraste esta publicación"
            };

            return res.redirect("/");
        }

        await Rating.create({

            value,

            UserId: req.session.user.id,

            PostId: postId
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error creando valoración"
        };

        return res.redirect("/");
    }
};

module.exports = {
    createRating
};