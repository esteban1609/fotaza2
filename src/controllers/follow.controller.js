const Follow = require("../models/Follow");

const followUser = async (req, res) => {
    

    try {

        const { userId } = req.params;

        if (
            Number(userId) === req.session.user.id
        ) {

            return res.send(
                "No podés seguirte a vos mismo"
            );
        }

        const existingFollow =
            await Follow.findOne({

                where: {
                    followerId: req.session.user.id,
                    followingId: userId
                }
            });

        if (existingFollow) {

            return res.send(
                "Ya seguís este usuario"
            );
        }

        await Follow.create({

            followerId: req.session.user.id,

            followingId: userId
        });

        res.redirect("/");

    } catch (error) {

        console.error(error);

        res.send("Error siguiendo usuario");
    }
};

module.exports = {
    followUser
};