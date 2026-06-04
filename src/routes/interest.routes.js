const express = require("express");

const router = express.Router();

const {
    createInterest,

    showInterests
} = require("../controllers/interest.controller");

router.post(
    "/interest/:postId",
    createInterest
);

router.get(
    "/posts/:postId/interests",
    showInterests
);

module.exports = router;