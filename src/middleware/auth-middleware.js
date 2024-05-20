const apiError = require("../exceptions/api-error.js");
const { validateAccessToken } = require("../services/token.js");

const auth = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(apiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(apiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      return next(apiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(apiError.UnauthorizedError());
  }
};

module.exports = {
  auth,
};
