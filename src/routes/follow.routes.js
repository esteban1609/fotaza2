const express = require("express");

const router = express.Router();

const {
    followUser,
    unfollowUser
} = require("../controllers/follow.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/follow/:userId",
    isAuthenticated,
    followUser
);

router.post(

    "/unfollow/:userId",

    unfollowUser
);

module.exports = router;