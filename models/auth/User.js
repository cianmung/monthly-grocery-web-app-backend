const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1002,
    },
    Admin: Number,
  },
  refreshToken: String,
  profilePicUrl: String,
});

module.exports = mongoose.model("User", userSchema);
