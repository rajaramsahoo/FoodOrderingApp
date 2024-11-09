const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    default:
      " https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
