const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

const {
    feed,
    searchPosts,
    showFollowingPosts
} = require("../controllers/feed.controller");

router.get("/", feed);

router.get(
    "/search",
    searchPosts
);

router.get(
    "/following-posts",
    isAuthenticated,
    showFollowingPosts
);
module.exports = router;