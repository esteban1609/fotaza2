const Follow = require("../models/Follow");

const followUser = async (req, res) => {
    

    try {

        const { userId } = req.params;

        if (
            Number(userId) === req.session.user.id
        ) {

            req.session.message = {
                type: "warning",
                text: "No podés seguirte a vos mismo"
            };

            return res.redirect("/");
        }

        const existingFollow =
            await Follow.findOne({

                where: {
                    followerId: req.session.user.id,
                    followingId: userId
                }
            });

        if (existingFollow) {

            req.session.message = {
                type: "info",
                text: "Ya seguís este usuario"
            };

            return res.redirect("/");
        }

        await Follow.create({

            followerId: req.session.user.id,

            followingId: userId
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error siguiendo usuario"
        };

        return res.redirect("/");
    }
};

module.exports = {
    followUser
};