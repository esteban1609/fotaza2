const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

const {
    feed,
    searchPosts,
    showFollowingPosts
} = require("../controllers/feed.controller");

router.get("/",isAuthenticated,
feed);

router.get(
    "/search",
    searchPosts
);

router.get(
    "/following-posts",
    showFollowingPosts
);
module.exports = router;