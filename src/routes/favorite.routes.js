
const express = require("express");
const router = express.Router();

const {
    addFavorite,
    showFavorites,
    removeFavorite
} = require("../controllers/favorite.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/favorites/:postId", isAuthenticated, addFavorite);

router.get("/favorites", isAuthenticated, showFavorites);

router.post("/favorites/remove/:postId", isAuthenticated, removeFavorite);

module.exports = router;
