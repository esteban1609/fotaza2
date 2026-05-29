const Post = require("../models/Post");

const dashboard = async (req, res) => {

    try {

        const posts = await Post.findAll({

            where: {
                UserId: req.session.user.id
            }
        });

        res.render("dashboard", {

            user: req.session.user,

            posts
        });

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error cargando dashboard"
        };

        return res.redirect("/");
    }
};

module.exports = {
    dashboard
};