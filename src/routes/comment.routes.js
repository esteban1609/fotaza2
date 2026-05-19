const express = require("express");

const router = express.Router();

const {
    createComment
} = require("../controllers/comment.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/comments/create/:postId",
    isAuthenticated,
    createComment
);

module.exports = router;