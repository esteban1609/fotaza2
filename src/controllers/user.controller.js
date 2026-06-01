const User = require("../models/User");

const Post = require("../models/Post");

const Follow = require("../models/Follow");

const Favorite = require("../models/Favorite");

const showProfile = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id, {

            include: [
                {
                    model: Post 
                },
                {
                    association: "Followers"
                },
                {
                    association: "Following"
                }
            ]
        });

        if (!user) {

            req.session.message = {
                type: "warning",
                text: "Usuario no encontrado"
            };

            return res.redirect("/");
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

        const favoriteCount = await Favorite.count({

            where: {

                UserId: user.id
            }
        });

        const postCount = user.Posts.length;

        res.render("profile", {

            profileUser: user,

            posts: user.Posts,

            followers: user.Followers,

            following: user.Following,
            
            postCount,
            
            favoriteCount,
            
            loggedUser: req.session.user
        }); 

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error cargando perfil"
        };

        return res.redirect("/");
    }
};

const showEditProfile = async (req, res) => {

    const user = await User.findByPk(
        req.session.user.id
    );

    res.render(
        "edit-profile",
        {
            user
        }
    );
};

const updateProfile = async (req, res) => {

    try {

        const {

            username,

            email,

            profile_image

        } = req.body;

        await User.update({

            username,

            email,

            profile_image

        }, {

            where: {

                id: req.session.user.id
            }
        });

        req.session.message = {

            type: "success",

            text: "Perfil actualizado correctamente"
        };

        res.redirect(`/users/${req.session.user.id}`);

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error actualizando perfil"
        };

        res.redirect("/profile/edit");
    }
};

module.exports = {
    showProfile,
    showEditProfile,
    updateProfile
};