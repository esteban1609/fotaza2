const express = require("express");

const router = express.Router();

const {
    createReport,

    showReports
} = require("../controllers/report.controller");

router.post(
    "/reports/:postId",
    createReport
);

router.get(
    "/reports",
    showReports
);

module.exports = router;