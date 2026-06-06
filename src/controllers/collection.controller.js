const Collection = require("../models/Collection");

const Favorite = require("../models/Favorite");

const Post = require("../models/Post");

const createCollection = async (req, res) => {

    try {

        await Collection.create({

            name: req.body.name,

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

module.exports ={
    createCollection,

    showCollections,

    showCollection
}