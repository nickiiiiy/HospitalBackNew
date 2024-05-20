require("dotenv").config();

const PORT = process.env.PORT || 5000;

const DB_CONNECTION = process.env.DB_CONNECTION;

const corsOptions = {
  origin: process.env.PORT,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = { PORT, DB_CONNECTION, corsOptions };
