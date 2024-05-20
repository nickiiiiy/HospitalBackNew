const { check } = require("express-validator");
const { validatorResult } = require("./validation-result");

const validationUserData = [
  check("login")
    .isString()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Введите логин!"),
  check("password")
    .isString()
    .matches(/^(?=.*[0-9])[a-zA-Z0-9]{6,}$/, "g")
    .withMessage(
      "Пароль должен содержать латинские символы и хотя бы 1 число, и быть не менее 6 символов!"
    ),
  validatorResult,
];

const validationUserAuthorization = [
  check("login")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Поле логин не может быть пустым!"),

  check("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Поле пароль не может быть пустым!"),
];
module.exports = {
  validationUserData,
  validationUserAuthorization,
};
