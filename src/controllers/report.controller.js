const Report = require("../models/Report");
const User = require("../models/User");
const Post = require("../models/Post");

const createReport = async (req, res) => {
    try {
        const { reason, description } = req.body;
        const { postId } = req.params;
        const userId = req.session.user.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            req.session.message = {
                type: "warning",
                text: "La publicación no existe"
            };
            return res.redirect("/");
        }

        const existingReport = await Report.findOne({
            where: {
                UserId: userId,
                PostId: postId
            }
        });

        if (existingReport) {
            req.session.message = {
                type: "info",
                text: "Ya denunciaste esta publicación"
            };
            return res.redirect("/");
        }

        if (!reason || !description || !description.trim()) {
            req.session.message = {
                type: "warning",
                text: "Completá el motivo y la descripción"
            };
            return res.redirect("/");
        }

        await Report.create({
            reason,
            description: description.trim(),
            UserId: userId,
            PostId: postId
        });

        req.session.message = {
            type: "success",
            text: "Denuncia enviada"
        };

        return res.redirect("/");

    } catch (error) {
        console.error(error);
        req.session.message = {
            type: "danger",
            text: "Error creando denuncia"
        };
        return res.redirect("/");
    }
};


const showReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            include: [
                { model: User },
                {
                    model: Post,
                    where: {
                        deleted: false
                    },
                    include: [User]
                }
            ],
            order: [["createdAt", "ASC"]]
        });

        const groupedReports = {};

        for (const report of reports) {
            const postId = report.PostId;

            if (!groupedReports[postId]) {
                groupedReports[postId] = {
                    post: report.Post,
                    reports: [],
                    reportedBy: new Set()
                };
            }

            groupedReports[postId].reports.push(report);
            groupedReports[postId].reportedBy.add(report.UserId);
        }

        const reportedPosts = Object.values(groupedReports)
            .filter(group => group.reportedBy.size > 3)
            .map(group => ({
                post: group.post,
                reports: group.reports,
                reporterCount: group.reportedBy.size
            }));

        res.render("reports", { reportedPosts });

    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
};


const dismissReports = async (req, res) => {
    try {
        const { postId } = req.params;

        await Report.destroy({
            where: { PostId: postId }
        });

        req.session.message = {
            type: "success",
            text: "Las denuncias fueron desestimadas correctamente"
        };

        return res.redirect("/reports");

    } catch (error) {
        console.error(error);
        req.session.message = {
            type: "danger",
            text: "Error al desestimar las denuncias"
        };
        return res.redirect("/reports");
    }
};

module.exports = {

    createReport,

    showReports,

    dismissReports

    
};