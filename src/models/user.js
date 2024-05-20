const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("Users", userSchema);
