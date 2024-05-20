const jwt = require("jsonwebtoken");
const Token = require("../models/token.js");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;

    return tokenData.save();
  }

  const newToken = await Token.create({ user: userId, refreshToken });

  return newToken;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return userData;
  } catch (error) {
    return null;
  }
};

const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });

  return tokenData;
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
};

module.exports = {
  generateTokens,
  saveToken,
  validateAccessToken,
  removeToken,
  validateRefreshToken,
  findToken,
};
