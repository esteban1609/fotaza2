const Collection = require("../models/Collection");

const Favorite = require("../models/Favorite");

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

    const collections = await Collection.findAll({

        where: {

            UserId: req.session.user.id
        },

        include: [

            Favorite
        ]
    });

    res.render("collections", {

        collections
    });
};

const showCollection = async (req, res) => {

    try {

        const { id } = req.params;

        const collection = await Collection.findByPk(id);

        const favorites = await Favorite.findAll({

            where: {

                CollectionId: id
            },

            include: [

                Post
            ]
        });

        res.render("collection-detail", {

            collection,

            favorites
        });

    } catch (error) {

        console.error(error);

        res.redirect("/collections");
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

module.exports ={
    createCollection,

    showCollections,

    showCollection,

    deleteCollection
}