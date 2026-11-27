
const express = require("express");
const router = express.Router();

const {
    createReport,
    showReports,
    dismissReports
} = require("../controllers/report.controller");

const {
    isAuthenticated,
    isAdmin
} = require("../middlewares/auth.middleware");

// Los usuarios autenticados pueden denunciar publicaciones.
router.post(
    "/reports/:postId",
    isAuthenticated,
    createReport
);

// Solo el administrador puede consultar las denuncias.
router.get(
    "/reports",
    isAdmin,
    showReports
);

router.post(
    "/reports/:postId/dismiss",
     isAdmin,
     dismissReports);

module.exports = router;
