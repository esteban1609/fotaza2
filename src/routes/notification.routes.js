const express = require("express");

const router = express.Router();

const {

    showNotifications

} = require("../controllers/notification.controller");

router.get(

    "/notifications",

    showNotifications
);

module.exports = router;