const express = require("express");

const router = express.Router();

const {
    showProfile,
    showEditProfile,
    updateProfile
} = require("../controllers/user.controller");

router.get("/users/:id", showProfile);

router.get(
    "/profile/edit",
    showEditProfile
);

router.post(
    "/profile/edit",
    updateProfile
);

module.exports = router;