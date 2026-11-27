
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const { Op } = require("sequelize");
const Follow = require("../models/Follow");
const Favorite = require("../models/Favorite");
const Interest = require("../models/Interest");
const Collection = require("../models/Collection");

// Calcular el promedio de valoraciones de cada publicación
const calculateRatings = (posts) => {

    for (const post of posts) {

        const ratings = post.Ratings || [];


        let average = 0;

        if (ratings.length > 0) {

            const total = ratings.reduce(
                (sum, rating) => sum + Number(rating.value),
                0
            );

            average = total / ratings.length;
        }

        post.setDataValue(
            "averageRating",
            average.toFixed(1)
        );

        post.setDataValue(
            "roundedAverage",
            Math.round(average)
        );
    }

    return posts;
};

const feed = async (req, res) => {

    try {

        const currentUser = req.session.user;

        let posts = await Post.findAll({

            where: {
                deleted: false,
                ...(!currentUser && { copyright: false })
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

        posts = calculateRatings(posts);

        const follows = currentUser
            ? await Follow.findAll({
                where: {
                    followerId: currentUser.id
                }
            })
            : [];

        const favorites = currentUser
            ? await Favorite.findAll({
                where: {
                    UserId: currentUser.id
                }
            })
            : [];

        const collections = currentUser
            ? await Collection.findAll({
                where: {
                    UserId: currentUser.id
                }
            })
            : [];

        res.render("feed", {
            posts,
            currentUser,
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

        const currentUser = req.session.user;

        const filtros = [];

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

        if (title && title.trim()) {
            filtros.push({
                title: { [Op.iLike]: `%${title}%` }
            });
        }

        if (description && description.trim()) {
            filtros.push({
                description: { [Op.iLike]: `%${description}%` }
            });
        }

        if (username && username.trim()) {
            filtros.push({
                "$User.username$": { [Op.iLike]: `%${username}%` }
            });
        }

        if (tag && tag.trim()) {
            filtros.push({
                tags: { [Op.iLike]: `%${tag}%` }
            });
        }

        if (copyright === "true" || copyright === "false") {
            filtros.push({
                copyright: copyright === "true"
            });
        }

        let posts = await Post.findAll({

            where: {
                [Op.and]: [
                    { deleted: false },
                    ...(!currentUser && [{ copyright: false }]),
                    ...filtros
                ]
            },

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

        posts = calculateRatings(posts);

       const follows = currentUser
            ? await Follow.findAll({
                where: {
                    followerId: currentUser.id
                }
            })
            : [];

        const favorites = currentUser
            ? await Favorite.findAll({
                where: {
                    UserId: currentUser.id
                }
            })
            : [];

        const collections = currentUser
            ? await Collection.findAll({
                where: {
                    UserId: currentUser.id
                }
            })
            : [];

        res.render("feed", {
            posts,
            currentUser,
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

        let posts = await Post.findAll({

            where: {
                UserId: followingIds,
                deleted: false
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

        posts = calculateRatings(posts);

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
