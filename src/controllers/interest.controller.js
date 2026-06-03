const Interest = require("../models/Interest");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

const createInterest = async (req, res) => {

    try {

        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        const existingInterest =
            await Interest.findOne({

                where: {

                    UserId: req.session.user.id,

                    PostId: postId
                }
            });

        if (existingInterest) {

            req.session.message = {

                type: "info",

                text: "Ya marcaste interés en esta publicación"
            };

            return res.redirect("/");
        }

        await Interest.create({

            UserId: req.session.user.id,

            PostId: postId
        });

        await Notification.create({

            UserId: post.UserId,

            message: `${req.session.user.username} está interesado en tu publicación`
        });

        req.session.message = {

            type: "success",

            text: "Interés registrado"
        };

        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.redirect("/");
    }
};

module.exports = {

    createInterest
};