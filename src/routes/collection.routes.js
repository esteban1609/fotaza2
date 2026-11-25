
const express = require("express");
const router = express.Router();

const {
    createCollection,
    showCollections,
    showCollection,
    deleteCollection
} = require("../controllers/collection.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/collections", isAuthenticated, showCollections);

router.post("/collections/create", isAuthenticated, createCollection);

router.get("/collections/:id", isAuthenticated, showCollection);

router.post("/collections/delete/:id", isAuthenticated, deleteCollection);

module.exports = router;
