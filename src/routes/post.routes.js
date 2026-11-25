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
    isAuthenticated,
    showEditPost
);

router.post(
    "/posts/edit/:id",
    isAuthenticated,
    updatePost
);

router.post(
    "/posts/delete/:id",
    isAuthenticated,
    deletePost
);

router.post(
    "/posts/toggle-comments/:id",
    isAuthenticated,
    toggleComments
);
module.exports = router;