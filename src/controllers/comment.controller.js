const Comment = require("../models/Comment");

const Notification = require("../models/Notification");

const Post = require("../models/Post");

const createComment = async (req, res) => {

    try {

        const { content } = req.body;

        const { postId } = req.params;

        await Comment.create({

            content,

            UserId: req.session.user.id,

            PostId: postId
        });

        const post = await Post.findByPk(postId);

        if (post.UserId !== req.session.user.id) {

            await Notification.create({

                UserId: post.UserId,

                message: `${req.session.user.username} comentó tu publicación`
            });
        }
        
        req.session.message = {
            type: "success",
            text: "Comentario creado correctamente"
        };

        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error creando comentario"
        };

        return res.redirect("/");
    }
};

module.exports = {
    createComment
};