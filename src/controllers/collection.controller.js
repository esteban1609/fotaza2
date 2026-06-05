const Collection = require("../models/Collection");

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

    const collections =
        await Collection.findAll({

            where: {

                UserId: req.session.user.id
            }
        });

    res.render("collections", {

        collections
    });
};

module.exports ={
    createCollection,

    showCollections
}