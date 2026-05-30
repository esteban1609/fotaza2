const Favorite = require("../models/Favorite");

const Post = require("../models/Post");

const User = require("../models/User");


const addFavorite = async (req, res) => {

    try {

        const { postId } = req.params;

        const existingFavorite = await Favorite.findOne({

            where: {

                UserId: req.session.user.id,

                PostId: postId
            }
        });

        if (existingFavorite) {

            req.session.message = {

                type: "info",

                text: "La publicación ya está en favoritos"
            };

            return res.redirect("/");
        }

        await Favorite.create({

            UserId: req.session.user.id,

            PostId: postId
        });

        req.session.message = {

            type: "success",

            text: "Publicación guardada en favoritos"
        };

        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error guardando favorito"
        };

        res.redirect("/");
    }
};

const showFavorites = async (req, res) => {

    try {

        const user = await User.findByPk(

            req.session.user.id,

            {

                include: {

                    model: Post,

                    as: "Favorites"
                }
            }
        );

        res.render("favorites", {

            favorites: user.Favorites
        });

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error cargando favoritos"
        };

        res.redirect("/");
    }
};

const removeFavorite = async (req, res) => {

    try {

        const { postId } = req.params;

        await Favorite.destroy({

            where: {

                UserId: req.session.user.id,

                PostId: postId
            }
        });

        req.session.message = {

            type: "success",

            text: "Favorito eliminado"
        };

        res.redirect("/favorites");

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error eliminando favorito"
        };

        res.redirect("/favorites");
    }
};

module.exports = {

    addFavorite,

    showFavorites,

    removeFavorite
};