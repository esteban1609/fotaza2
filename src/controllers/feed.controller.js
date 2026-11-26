const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const { Op } = require("sequelize");
const Follow = require("../models/Follow");
const Favorite = require("../models/Favorite");
const Interest = require("../models/Interest");
const Collection = require("../models/Collection");

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
                },
                {
                    model: Interest
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

        const collections = await Collection.findAll({

            where: {

                UserId: req.session.user.id
            }
        });

        res.render("feed", {
            posts,
            
            currentUser: req.session.user,
            
            follows,
            
            favorites,

            collections
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
        const { q, title, description, username, tag, copyright } = req.query;

        const filtros = [];

        // Búsqueda general
        if (q && q.trim()) {
            filtros.push({
                [Op.or]: [
                    { title: { [Op.iLike]: `%${q}%` } },
                    { description: { [Op.iLike]: `%${q}%` } },
                    { "$User.username$": { [Op.iLike]: `%${q}%` } },
                    { tags: { [Op.iLike]: `%${q}%` } }
                ]
            });
        }

        // Filtro por título
        if (title && title.trim()) {
            filtros.push({
                title: { [Op.iLike]: `%${title}%` }
            });
        }

        // Filtro por descripción
        if (description && description.trim()) {
            filtros.push({
                description: { [Op.iLike]: `%${description}%` }
            });
        }

        // Filtro por usuario
        if (username && username.trim()) {
            filtros.push({
                "$User.username$": { [Op.iLike]: `%${username}%` }
            });
        }

        // Filtro por etiqueta
        if (tag && tag.trim()) {
            filtros.push({
                tags: { [Op.iLike]: `%${tag}%` }
            });
        }

        // Filtro por licencia
        if (copyright === "true" || copyright === "false") {
            filtros.push({
                copyright: copyright === "true"
            });
        }

        const posts = await Post.findAll({
            where: filtros.length > 0
                ? { [Op.and]: filtros }
                : {},

            include: [
                { model: User },
                {
                    model: Comment,
                    include: User
                },
                { model: Rating },
                { model: Interest }
            ],

            order: [["createdAt", "DESC"]]
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

        const collections = await Collection.findAll({
            where: {
                UserId: req.session.user.id
            }
        });

        res.render("feed", {
            posts,
            currentUser: req.session.user,
            follows,
            favorites,
            collections
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

const showFollowingPosts = async (req, res) => {

    try {

        const follows = await Follow.findAll({

            where: {

                followerId: req.session.user.id
            }
        });

        const followingIds = follows.map(

            follow => follow.followingId
        );

        const posts = await Post.findAll({

            where: {

                UserId: followingIds
            },

            include: [

                User,

                {
                    model: Comment,
                    include: User
                },

                {
                    model: Rating
                },

                {
                    model: Interest
                }
            ],

            order: [

                ["createdAt", "DESC"]
            ]
        });

        const favorites = await Favorite.findAll({

            where: {

                UserId: req.session.user.id
            }
        });

        const collections = await Collection.findAll({

            where: {

                UserId: req.session.user.id
            }
        });

        res.render("feed", {

            posts,

            currentUser: req.session.user,

            follows,

            favorites,

            collections
        });

    } catch (error) {

        console.error(error);

        res.redirect("/");
    }
};



module.exports = {
    feed,
    searchPosts,
    showFollowingPosts
    
};