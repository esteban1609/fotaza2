const express = require("express");
const router = express.Router();

const {
    showMessages,
    showConversation,
    sendMessage
} = require("../controllers/message.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

// Ver todas las conversaciones
router.get("/messages", isAuthenticated, showMessages);

// Abrir conversación con un usuario
router.get("/messages/:userId", isAuthenticated, showConversation);

// Enviar mensaje
router.post("/messages/:userId", isAuthenticated, sendMessage);

module.exports = router;