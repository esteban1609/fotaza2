
const express = require("express");
const router = express.Router();

const {
    createCommentReport,
    getCommentReports
} = require("../controllers/commentReport.controller");

const {
    isAuthenticated
} = require("../middlewares/auth.middleware");

router.post(
    "/comments/report/:commentId",
    isAuthenticated,
    createCommentReport
);

router.get(
    "/comments/reports",
    isAuthenticated,
    getCommentReports
);

module.exports = router;
