const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createOneAppointment,
  editOneAppointment,
  deleteOneAppointment,
} = require("../controllers/appointment.js");
const {
  validationAppointments,
} = require("../middleware/appointment-validation.js");
const { auth } = require("../middleware/auth-middleware.js");

router.get("/", auth, getAllAppointments);
router.post("/", auth, validationAppointments, createOneAppointment);
router.patch("/:id", auth, validationAppointments, editOneAppointment);
router.delete("/:id", deleteOneAppointment);

module.exports = router;
