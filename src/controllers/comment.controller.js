const Comment = require("../models/Comment");

const createComment = async (req, res) => {

    try {

        const { content } = req.body;

        const { postId } = req.params;

        await Comment.create({

            content,

            UserId: req.session.user.id,

            PostId: postId
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.send("Error creando comentario");
    }
};

module.exports = {
    createComment
};