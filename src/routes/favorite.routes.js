const express = require("express");

const router = express.Router();

const {

    addFavorite,

    showFavorites

} = require("../controllers/favorite.controller");

router.post(

    "/favorites/:postId",

    addFavorite
);

router.get(

    "/favorites",

    showFavorites
);

module.exports = router;

