const express = require("express");

const router = express.Router();

const {
    feed,
    searchPosts
} = require("../controllers/feed.controller");

router.get("/", feed);

router.get(
    "/search",
    searchPosts
);

module.exports = router;