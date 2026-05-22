const express = require("express");

const router = express.Router();

const {
    followUser
} = require("../controllers/follow.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/follow/:userId",
    isAuthenticated,
    followUser
);

module.exports = router;