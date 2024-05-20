const { check } = require("express-validator");
const { formatDate } = require("../utils/check-date.js");

const validationAppointments = [
  check("patientName")
    .trim()
    .notEmpty()
    .withMessage("Поле не может быть пустым"),
  check("doctorName")
    .trim()
    .notEmpty()
    .withMessage("Поле не может быть пустым"),
  check("appointmentDate")
    .isDate({ format: "YYYY-MM-DD" })
    .custom(formatDate)
    .withMessage("Нельзя поставить дату на прошлое число"),
  check("complaints")
    .trim()
    .notEmpty()
    .withMessage("Поле не может быть пустым"),
];

module.exports = {
  validationAppointments,
};
