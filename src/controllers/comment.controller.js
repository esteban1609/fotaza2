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