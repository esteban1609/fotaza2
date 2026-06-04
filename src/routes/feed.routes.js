const express = require("express");

const router = express.Router();

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
    showFollowingPosts
);
module.exports = router;