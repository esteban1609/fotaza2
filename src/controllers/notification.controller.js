
const Notification = require("../models/Notification");

const showNotifications = async (req, res) => {

    try {

        const notifications = await Notification.findAll({

            where: {
                UserId: req.session.user.id
            },

            order: [
                ["createdAt", "DESC"]
            ]
        });

        res.render("notifications", {
            notifications
        });

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error cargando notificaciones"
        };

        return res.redirect("/");
    }
};

const markNotificationRead = async (req, res) => {

    try {

        const { id } = req.params;

        const notification = await Notification.findOne({

            where: {
                id,
                UserId: req.session.user.id
            }
        });

        if (!notification) {
            return res.redirect("/notifications");
        }

        await notification.update({
            read: true
        });

        return res.redirect("/notifications");

    } catch (error) {

        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error marcando la notificación como leída"
        };

        return res.redirect("/notifications");
    }
};

module.exports = {
    showNotifications,
    markNotificationRead
};
