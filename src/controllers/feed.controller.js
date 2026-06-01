const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const { Op } = require("sequelize");
const Follow = require("../models/Follow");
const Favorite = require("../models/Favorite");

const feed = async (req, res) => {

    try {

        const posts = await Post.findAll({

            include: [
    User,
    {
        model: Comment,
        include: User
    },
    {
        model: Rating
    }
],

            order: [
                ["createdAt", "DESC"]
            ]
        });

        const follows = await Follow.findAll({

            where: {
                followerId: req.session.user.id
            }
        });

        const favorites = await Favorite.findAll({

            where: {
                UserId: req.session.user.id
            }
        });

        res.render("feed", {
            posts,
            
            currentUser: req.session.user,
            
            follows,
            
            favorites
        });

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error cargando publicación"
        };

        return res.redirect("/");
    }
};

const searchPosts = async (req, res) => {

    try {

        const { q } = req.query;

        const posts = await Post.findAll({

            include: [

                {
                    model: User
                },

                {
                    model: Comment,
                    include: User
                },

                {
                    model: Rating
                }
            ],

            where: {

                [Op.or]: [

                    {
                        title: {
                            [Op.iLike]: `%${q}%`
                        }
                    },

                    {
                        description: {
                            [Op.iLike]: `%${q}%`
                        }
                    },

                    {
                        "$User.username$": {
                            [Op.iLike]: `%${q}%`
                        }
                    }
                ]
            }
        });

        const follows = await Follow.findAll({

            where: {

                followerId: req.session.user.id
            }
        });

        const favorites = await Favorite.findAll({

            where: {

                UserId: req.session.user.id
            }
        });

        res.render("feed", {

            posts,

            currentUser: req.session.user,

            follows,

            favorites
        });

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error buscando publicaciones"
        };

        return res.redirect("/");
    }
};



module.exports = {
    feed,
    searchPosts
    
};