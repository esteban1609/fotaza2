const Report = require("../models/Report");
const User = require("../models/User");
const Post = require("../models/Post");

const createReport = async (req, res) => {

    try {

        const { reason, description } = req.body;

        const { postId } = req.params;

        await Report.create({

            reason,

            description,

            UserId: req.session.user.id,

            PostId: postId
        });

        req.session.message = {

            type: "success",

            text: "Denuncia enviada"
        };

        res.redirect("/");

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error creando denuncia"
        };

        res.redirect("/");
    }
};

const showReports = async (req, res) => {

    try {

        const reports = await Report.findAll({

            include: [

                User,

                Post
            ],

            order: [

                ["createdAt", "DESC"]
            ]
        });

        res.render("reports", {

            reports
        });

    } catch (error) {

        console.error(error);

        res.redirect("/");
    }
};

module.exports = {

    createReport,

    showReports
};