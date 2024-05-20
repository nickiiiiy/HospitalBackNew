const apiError = require("../exceptions/api-error.js");

const errorMiddleware = (err, req, res, next) => {
  if (err.status && err.message) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors || [] });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};

module.exports = { errorMiddleware };
