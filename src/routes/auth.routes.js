const express = require("express");

const router = express.Router();

const {
    showRegister,
    showLogin,
    register
} = require("../controllers/auth.controller");

router.get("/register", showRegister);

router.get("/login", showLogin);

router.post("/register", register);

module.exports = router;