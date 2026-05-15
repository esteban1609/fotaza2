const express = require("express");

const router = express.Router();

const { dashboard } = require("../controllers/dashboard.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get(
    "/dashboard",
    isAuthenticated,
    dashboard
);

module.exports = router;