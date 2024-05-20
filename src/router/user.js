const express = require("express");
const router = express.Router();
const {
  registrationUser,
  authorizationUser,
  logoutUser,
  refreshUser,
} = require("../controllers/user.js");
const {
  validationUserData,
  validationUserAuthorization,
} = require("../middleware/user-validation.js");

router.post("/registration", validationUserData, registrationUser);
router.post("/authorization", validationUserAuthorization, authorizationUser);
router.get("/logout", logoutUser);
router.get("/refresh", refreshUser);

module.exports = router;
