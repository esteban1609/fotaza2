const express = require("express");

const router = express.Router();

const {
    createRating
} = require("../controllers/rating.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/ratings/create/:postId",
    isAuthenticated,
    createRating
);

module.exports = router;