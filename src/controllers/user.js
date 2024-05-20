const { validationResult } = require("express-validator");
const {
  registration,
  authorization,
  logout,
  refresh,
} = require("../services/user.js");
const { cookieOptions } = require("../utils/cookie.js");
const apiError = require("../exceptions/api-error.js");

const registrationUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const userData = await registration(login, password);

    res.cookie("refreshToken", userData.refreshToken, cookieOptions);

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

const authorizationUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const userData = await authorization(login, password);

    res.cookie("refreshToken", userData.refreshToken, cookieOptions);

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const token = await logout(refreshToken);

    res.clearCookie("refreshToken");

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

const refreshUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refresh(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, cookieOptions);

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationUser,
  authorizationUser,
  logoutUser,
  refreshUser,
};
