const express = require("express");

const router = express.Router();



const {
    showCreatePost,
    createPost,
    showEditPost,
    updatePost,
    deletePost,
    toggleComments
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
    createPost
);

router.get(
    "/posts/edit/:id",
    showEditPost
);

router.post(
    "/posts/edit/:id",
    updatePost
);

router.post(
    "/posts/delete/:id",
    deletePost
);

router.post(
    "/posts/toggle-comments/:id",
    toggleComments
);

module.exports = router;