const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
    showCreatePost,
    createPost
} = require("../controllers/post.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.get(
    "/posts/create",
    isAuthenticated,
    showCreatePost
);

router.post(
    "/posts/create",
    isAuthenticated,
    upload.single("image"),
    createPost
);

module.exports = router;