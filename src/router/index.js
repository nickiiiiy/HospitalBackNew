const express = require("express");
const router = express.Router();
const userRoutes = require("./user.js");
const appointmentRoutes = require("./appointment.js");
const { auth } = require("../middleware/auth-middleware.js");

router.use("/user", userRoutes);
router.use("/appointment", appointmentRoutes);

module.exports = router;
