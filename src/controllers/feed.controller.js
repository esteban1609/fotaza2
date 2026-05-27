const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const { Op } = require("sequelize");

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

        res.render("feed", {
            posts,
            currentUser: req.session.user
        });

    } catch (error) {

        console.error(error);

        res.send("Error cargando publicaciones");
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

        res.render("feed", {

            posts,

            currentUser: req.session.user
        });

    } catch (error) {

        console.error(error);

        res.send("Error buscando publicaciones");
    }
};

module.exports = {
    feed,
    searchPosts
};