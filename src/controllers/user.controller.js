const User = require("../models/User");

const Post = require("../models/Post");

const Follow = require("../models/Follow");

const showProfile = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id, {

            include: [Post]
        });

        if (!user) {

            return res.send("Usuario no encontrado");
        }

        const followers = await Follow.count({

            where: {
                followingId: id
            }
        });

        const following = await Follow.count({

            where: {
                followerId: id
            }
        });

        res.render("profile", {

            profileUser: user,

            posts: user.Posts,

            followers,

            following
        });

    } catch (error) {

        console.error(error);

        res.send("Error cargando perfil");
    }
};

module.exports = {
    showProfile
};