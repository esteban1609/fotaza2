const express = require("express");

const router = express.Router();

const {
    createComment,
    deleteComment
} = require("../controllers/comment.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/comments/create/:postId",
    isAuthenticated,
    createComment
);

router.post(
    "/comments/delete/:id",
    isAuthenticated,
    deleteComment
);

module.exports = router;