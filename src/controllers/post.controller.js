const Post = require("../models/Post");

const showCreatePost = (req, res) => {

    res.render("create-post");
};

const createPost = async (req, res) => {

    try {

        const { title, description } = req.body;

        const { image } = req.body;

        await Post.create({

            title,
            description,
            image,

            UserId: req.session.user.id
        });

        res.send("Publicación creada correctamente");

    } catch (error) {

        console.error(error);

        res.send("Error creando publicación");
    }
};

module.exports = {
    showCreatePost,
    createPost
};