
const express = require("express");

const router = express.Router();

const {
    showNotifications,
    markNotificationRead
} = require("../controllers/notification.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get(
    "/notifications",
    isAuthenticated,
    showNotifications
);

router.post(
    "/notifications/:id/read",
    isAuthenticated,
    markNotificationRead
);

module.exports = router;
