const Post = require("../models/Post");

const showCreatePost = (req, res) => {

    res.render("create-post");
};

const createPost = async (req, res) => {

    try {

        const {

            title,

            description,

            image,
            
            tags,

            copyright

        } = req.body;

       await Post.create({

            title,

            description,

            image,

            tags,

            copyright: copyright === "on",

            UserId: req.session.user.id
        });

        req.session.message = {
            type: "success",
            text: "Publicación creada correctamente"
        };
        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error creando publicación"
        };

        return res.redirect("/");
    }
};

const showEditPost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {

            req.session.message = {
                type: "warning",
                text: "Post no encontrado"
            };

            return res.redirect("/");
        }

        if (post.UserId !== req.session.user.id) {

            req.session.message = {
                type: "danger",
                text: "No autorizado"
            };

            return res.redirect("/");
        }

        res.render("edit-post", {
            post
        });

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error cargando edición"
        };

        return res.redirect("/");
    }
};

const updatePost = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, description } = req.body;

        const post = await Post.findByPk(id);

        if (!post) {

            req.session.message = {
                type: "warning",
                text: "Post no encontrado"
            };

            return res.redirect("/");
        }

        if (post.UserId !== req.session.user.id) {

            req.session.message = {
                type: "danger",
                text: "No autorizado"
            };

            return res.redirect("/");
        }

        await post.update({

            title,

            description
        });

        res.redirect("/dashboard");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error actualizando publicación"
        };

        return res.redirect("/");
    }
};

const deletePost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {

            req.session.message = {
                type: "warning",
                text: "Post no encontrado"
            };

            return res.redirect("/");
        }

        if (post.UserId !== req.session.user.id) {

            req.session.message = {
                type: "danger",
                text: "No autorizado"
            };

            return res.redirect("/");
        }

        await post.destroy();

        res.redirect("/dashboard");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error eliminando publicación"
        };

        return res.redirect("/");
    }
};

const toggleComments = async (req, res) => {

    try {

        const post = await Post.findByPk(
            req.params.id
        );

        if (
            post.UserId !== req.session.user.id
        ) {

            return res.redirect("/");
        }

        await post.update({

            commentsEnabled: !post.commentsEnabled
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.redirect("/");
    }
};

module.exports = {
    showCreatePost,
    createPost,
    showEditPost,
    updatePost,
    deletePost,
    toggleComments
};

