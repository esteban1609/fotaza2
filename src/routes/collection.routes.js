const express = require("express");

const router = express.Router();

const {

    createCollection,

    showCollections

} = require("../controllers/collection.controller");

router.get(
    "/collections",
    showCollections
);

router.post(
    "/collections/create",
    createCollection
);

module.exports = router;