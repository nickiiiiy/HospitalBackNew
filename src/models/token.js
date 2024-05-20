const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenShema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = Token = mongoose.model("Tokens", tokenShema);
