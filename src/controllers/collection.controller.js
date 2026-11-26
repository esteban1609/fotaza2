const Collection = require("../models/Collection");
const CollectionPost = require("../models/CollectionPost");
const Post = require("../models/Post");

const createCollection = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name || !name.trim()) {

            req.session.message = {
                type: "warning",
                text: "Debes ingresar un nombre para la colección"
            };

            return res.redirect("/collections");
        }

        await Collection.create({

            name,

            UserId: req.session.user.id
        });

        req.session.message = {

            type: "success",

            text: "Colección creada"
        };

        res.redirect("/collections");

    } catch (error) {

        console.error(error);

        res.redirect("/");
    }
};

const showCollections = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            where: {
                UserId: req.session.user.id
            },
            include: [
                {
                    model: CollectionPost,
                    include: [Post]
                }
            ]
        });

        res.render("collections", {
            collections
        });

    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
};

const showCollection = async (req, res) => {
    try {
        const collection = await Collection.findOne({
            where: {
                id: req.params.id,
                UserId: req.session.user.id
            },
            include: [
                {
                    model: CollectionPost,
                    include: [Post]
                }
            ]
        });

        if (!collection) {
            return res.redirect("/collections");
        }

        res.render("collection-detail", {
            collection
        });

    } catch (error) {
        console.error(error);
        res.redirect("/collections");
    }
};

const addPostToCollection = async (req, res) => {
    try {
        const { collectionId, postId } = req.body;

        const collection = await Collection.findOne({
            where: {
                id: collectionId,
                UserId: req.session.user.id
            }
        });

        if (!collection) {
            return res.redirect("/");
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.redirect("/");
        }

        const existing = await CollectionPost.findOne({
            where: {
                CollectionId: collectionId,
                PostId: postId
            }
        });

        if (existing) {
            req.session.message = {
                type: "warning",
                text: "Esta publicación ya está en esa colección"
            };

            return res.redirect("/");
        }

        await CollectionPost.create({
            CollectionId: collectionId,
            PostId: postId
        });

        req.session.message = {
            type: "success",
            text: "Publicación agregada a la colección"
        };

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
};

const deleteCollection = async (req, res) => {

    try {

        await Collection.destroy({

            where: {
                id: req.params.id,
                UserId: req.session.user.id
            }
        });

        req.session.message = {
            type: "success",
            text: "Colección eliminada"
        };

        res.redirect("/collections");

    } catch (error) {

        console.error(error);

        res.redirect("/collections");
    }
};

const removePostFromCollection = async (req, res) => {
    try {
        const { collectionId, postId } = req.params;

        // Verificar que la colección pertenezca al usuario
        const collection = await Collection.findOne({
            where: {
                id: collectionId,
                UserId: req.session.user.id
            }
        });

        if (!collection) {
            return res.redirect("/collections");
        }

        // Eliminar solamente la relación entre publicación y colección
        await CollectionPost.destroy({
            where: {
                CollectionId: collectionId,
                PostId: postId
            }
        });

        req.session.message = {
            type: "success",
            text: "Publicación eliminada de la colección"
        };

        res.redirect(`/collections/${collectionId}`);

    } catch (error) {
        console.error(error);
        res.redirect("/collections");
    }
};

module.exports ={
    createCollection,

    showCollections,

    showCollection,

    deleteCollection,

    addPostToCollection,

    removePostFromCollection
}