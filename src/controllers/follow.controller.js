const Follow = require("../models/Follow");

const Notification = require("../models/Notification");

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

            res.redirect(`/users/${userId}`);
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

            res.redirect(`/users/${userId}`);
        }

        await Follow.create({

            followerId: req.session.user.id,

            followingId: userId
        });

        await Notification.create({

            UserId: userId,

            message: `${req.session.user.username} comenzó a seguirte`
        });
        
        
        req.session.message = {

            type: "success",

            text: "Ahora sigues a este usuario"
        };

        res.redirect(`/users/${userId}`);

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error siguiendo usuario"
        };

        res.redirect(`/users/${userId}`);
    }
};

const unfollowUser = async (req, res) => {

    try {

        const { userId } = req.params;

        await Follow.destroy({

            where: {

                followerId: req.session.user.id,

                followingId: userId
            }
        });

        req.session.message = {

            type: "success",

            text: "Has dejado de seguir a este usuario"
        };

        res.redirect(`/users/${userId}`);

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error dejando de seguir usuario"
        };

        res.redirect(`/users/${userId}`);
    }
};

module.exports = {
    followUser,
    
    unfollowUser
};