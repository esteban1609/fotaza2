const express = require("express");

const router = express.Router();

const {
    createInterest
} = require("../controllers/interest.controller");

router.post(
    "/interest/:postId",
    createInterest
);

module.exports = router;