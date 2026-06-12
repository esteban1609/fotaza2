const express = require("express");

const router = express.Router();

const {

    createCollection,

    showCollections,

    showCollection,

    deleteCollection

} = require("../controllers/collection.controller");

router.get(
    "/collections",
    showCollections
);

router.post(
    "/collections/create",
    createCollection
);

router.get(
    "/collections/:id",
    showCollection
);

router.post(
    "/collections/delete/:id",
    deleteCollection
);

module.exports = router;