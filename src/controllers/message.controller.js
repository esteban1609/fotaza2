const Message = require("../models/Message");
const User = require("../models/User");
const { Op } = require("sequelize");

// Mostrar conversaciones del usuario
const showMessages = async (req, res) => {
    try {
        const userId = req.session.user.id;

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: User, as: "Sender" },
                { model: User, as: "Receiver" }
            ],
            order: [["createdAt", "DESC"]]
        });

        const conversations = new Map();

        messages.forEach(message => {
            const otherUser =
                message.senderId === userId
                    ? message.Receiver
                    : message.Sender;

            if (otherUser && !conversations.has(otherUser.id)) {
                conversations.set(otherUser.id, {
                    user: otherUser,
                    lastMessage: message
                });
            }
        });

        res.render("messages", {
            conversations: Array.from(conversations.values())
        });

    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
};

// Abrir una conversación
const showConversation = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const otherUserId = req.params.userId;

        if (Number(userId) === Number(otherUserId)) {
            return res.redirect("/messages");
        }

        const otherUser = await User.findByPk(otherUserId);

        if (!otherUser) {
            return res.redirect("/messages");
        }

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: userId,
                        receiverId: otherUserId
                    },
                    {
                        senderId: otherUserId,
                        receiverId: userId
                    }
                ]
            },
            include: [
                { model: User, as: "Sender" },
                { model: User, as: "Receiver" }
            ],
            order: [["createdAt", "ASC"]]
        });

        await Message.update(
            { read: true },
            {
                where: {
                    senderId: otherUserId,
                    receiverId: userId,
                    read: false
                }
            }
        );

        res.render("conversation", {
            messages,
            otherUser,
            currentUser: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.redirect("/messages");
    }
};

// Enviar mensaje
const sendMessage = async (req, res) => {
    try {
        const senderId = req.session.user.id;
        const receiverId = req.params.userId;
        const { content } = req.body;

        if (
            Number(senderId) === Number(receiverId) ||
            !content ||
            !content.trim()
        ) {
            return res.redirect(`/messages/${receiverId}`);
        }

        const receiver = await User.findByPk(receiverId);

        if (!receiver) {
            return res.redirect("/messages");
        }

        await Message.create({
            senderId,
            receiverId,
            content: content.trim()
        });

        res.redirect(`/messages/${receiverId}`);

    } catch (error) {
        console.error(error);
        res.redirect("/messages");
    }
};

module.exports = {
    showMessages,
    showConversation,
    sendMessage
};