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

        req.session.message = {
            type: "success",
            text: "Publicación creada correctamente"
        };
        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.send("Error creando publicación");
    }
};

const showEditPost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {

            return res.send("Post no encontrado");
        }

        if (post.UserId !== req.session.user.id) {

            return res.send("No autorizado");
        }

        res.render("edit-post", {
            post
        });

    } catch (error) {

        console.error(error);

        res.send("Error cargando edición");
    }
};

const updatePost = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, description } = req.body;

        const post = await Post.findByPk(id);

        if (!post) {

            return res.send("Post no encontrado");
        }

        if (post.UserId !== req.session.user.id) {

            return res.send("No autorizado");
        }

        await post.update({

            title,

            description
        });

        res.redirect("/dashboard");

    } catch (error) {

        console.error(error);

        res.send("Error actualizando publicación");
    }
};

const deletePost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {

            return res.send("Post no encontrado");
        }

        if (post.UserId !== req.session.user.id) {

            return res.send("No autorizado");
        }

        await post.destroy();

        res.redirect("/dashboard");

    } catch (error) {

        console.error(error);

        res.send("Error eliminando publicación");
    }
};

module.exports = {
    showCreatePost,
    createPost,
    showEditPost,
    updatePost,
    deletePost
};

