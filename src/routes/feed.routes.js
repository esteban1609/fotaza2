const express = require("express");

const router = express.Router();

const {
    feed
} = require("../controllers/feed.controller");

router.get("/", feed);

module.exports = router;