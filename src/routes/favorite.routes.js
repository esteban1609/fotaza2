const express = require("express");

const router = express.Router();

const {

    addFavorite,

    showFavorites,

    removeFavorite

} = require("../controllers/favorite.controller");

router.post(

    "/favorites/:postId",

    addFavorite
);

router.get(

    "/favorites",

    showFavorites
);

router.post(

    "/favorites/remove/:postId",

    removeFavorite
);

module.exports = router;

