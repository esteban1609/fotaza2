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

        await Notification.update(

            {

                read: true
            },

            {

                where: {

                    UserId: req.session.user.id,

                    read: false
                }
            }
        );

        res.render("notifications", {

            notifications
        });

    } catch (error) {

        console.error(error);

        req.session.message = {

            type: "danger",

            text: "Error cargando notificaciones"
        };

        res.redirect("/");
    }
};

module.exports = {

    showNotifications
};