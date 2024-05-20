const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} = require("./token.js");
const { userDto } = require("../dtos/user.js");
const apiError = require("../exceptions/api-error.js");

const registration = async (login, password) => {
  const candidate = await User.findOne({ login });
  if (candidate) {
    throw apiError.BadRequest(
      `Пользватель с данным логином: ${login} уже существует`
    );
  }
  const hashPassword = await bcrypt.hash(password, 3);

  const user = await User.create({ login, password: hashPassword });

  const userDtoInstance = userDto(user);

  const tokens = generateTokens({ ...userDtoInstance });

  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};

const authorization = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw apiError.BadRequest(
      `Пользватель с данным логином: ${login} не найден`
    );
  }

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw apiError.BadRequest("Неверный пароль");
  }
  const userDtoInstance = userDto(user);

  const tokens = generateTokens({ ...userDtoInstance });

  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};

const logout = async (refreshToken) => {
  const token = await removeToken(refreshToken);

  return token;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw apiError.UnauthorizedError;
  }
  const userData = validateRefreshToken(refreshToken);

  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw apiError.UnauthorizedError();
  }
  const user = await User.findById(userData.id);

  const userDtoInstance = userDto(user);

  const tokens = generateTokens({ ...userDtoInstance });

  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};

module.exports = {
  registration,
  authorization,
  logout,
  refresh,
};
