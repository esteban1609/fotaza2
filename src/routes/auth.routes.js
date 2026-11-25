const express = require("express");

const router = express.Router();

const {
    showRegister,
    showLogin,
    register,
    login,
    logout
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/register", showRegister);

router.get("/login", showLogin);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

module.exports = router;