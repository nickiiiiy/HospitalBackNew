const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRoutes = require("./src/router/index.js");
const { DB_CONNECTION, PORT, corsOptions } = require("./config.js");
const { errorMiddleware } = require("./src/middleware/error-middleware.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", apiRoutes);
app.use(errorMiddleware);

const loadApp = async () => {
  try {
    await mongoose.connect(DB_CONNECTION);

    app.listen(PORT);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

loadApp();
