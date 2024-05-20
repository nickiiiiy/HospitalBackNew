const apiError = (status, message, errors = []) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
};

apiError.UnauthorizedError = () => apiError(401, "Пользователь не авторизован");

apiError.BadRequest = (message, errors = []) => apiError(400, message, errors);

module.exports = apiError;
