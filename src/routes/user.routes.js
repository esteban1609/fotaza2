const express = require("express");

const router = express.Router();

const {
    showProfile
} = require("../controllers/user.controller");

router.get("/users/:id", showProfile);

module.exports = router;