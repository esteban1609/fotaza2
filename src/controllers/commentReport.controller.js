
const CommentReport = require("../models/CommentReport");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const createCommentReport = async (req, res) => {
    try {
        const { reason, description } = req.body;
        const { commentId } = req.params;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            req.session.message = {
                type: "danger",
                text: "El comentario no existe"
            };
            return res.redirect("/");
        }

        // No permitir denunciar un comentario propio
        if (comment.UserId === req.session.user.id) {
            req.session.message = {
                type: "warning",
                text: "No podés denunciar tu propio comentario"
            };
            return res.redirect("/");
        }

        if (!reason || !description || !description.trim()) {
            req.session.message = {
                type: "warning",
                text: "Debés completar el motivo y la descripción"
            };
            return res.redirect("/");
        }

        // Evitar que el mismo usuario denuncie dos veces
        const existingReport = await CommentReport.findOne({
            where: {
                UserId: req.session.user.id,
                CommentId: commentId
            }
        });

        if (existingReport) {
            req.session.message = {
                type: "warning",
                text: "Ya denunciaste este comentario"
            };
            return res.redirect("/");
        }

        await CommentReport.create({
            reason,
            description: description.trim(),
            UserId: req.session.user.id,
            CommentId: commentId
        });

        req.session.message = {
            type: "success",
            text: "Denuncia enviada correctamente"
        };

        return res.redirect("/");

    } catch (error) {
        console.error("Error denunciando comentario:", error);

        req.session.message = {
            type: "danger",
            text: "No se pudo enviar la denuncia"
        };

        return res.redirect("/");
    }
};

const getCommentReports = async (req, res) => {
    try {
        const reports = await CommentReport.findAll({
            include: [
                {
                    model: Comment,
                    required: true,
                    include: [
                        {
                            model: Post,
                            required: true,
                            where: {
                                UserId: req.session.user.id
                            }
                        }
                    ]
                },
                {
                    model: User,
                    required: true
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.render("comment-reports", {
            reports,
            currentUser: req.session.user
        });

    } catch (error) {
        console.error("Error obteniendo denuncias:", error);
        return res.redirect("/");
    }
};

module.exports = {
    createCommentReport,
    getCommentReports
};
