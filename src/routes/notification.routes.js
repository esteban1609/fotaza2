const express = require("express");

const router = express.Router();

const {

    showNotifications

} = require("../controllers/notification.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get(

    "/notifications",
    
    isAuthenticated,

    showNotifications
);

module.exports = router;