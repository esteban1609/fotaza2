const express = require("express");

const router = express.Router();

const {
    createInterest,

    showInterests
} = require("../controllers/interest.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/interest/:postId",
    isAuthenticated,
    createInterest
);

router.get(
    "/posts/:postId/interests",
    isAuthenticated,
    showInterests
);

module.exports = router;