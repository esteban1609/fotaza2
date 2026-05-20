const Rating = require("../models/Rating");

const Post = require("../models/Post");

const createRating = async (req, res) => {

    try {

        const { value } = req.body;

        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (post.UserId === req.session.user.id) {

            return res.send(
                "No puedes valorar tu propia publicación"
            );
        }

        const existingRating =
            await Rating.findOne({

                where: {
                    UserId: req.session.user.id,
                    PostId: postId
                }
            });

        if (existingRating) {

            return res.send(
                "Ya valoraste esta publicación"
            );
        }

        await Rating.create({

            value,

            UserId: req.session.user.id,

            PostId: postId
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.send("Error creando valoración");
    }
};

module.exports = {
    createRating
};