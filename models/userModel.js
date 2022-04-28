const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input your name"],
    unique: true,
    maxlength: [20, "Your name must not be more than 25 characters"],
    minlength: [3, "Your name must not be less than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please input your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please input a valid email address"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["Librarian", "Regular"],
    default: "Regular",
  },
  password: {
    type: String,
    required: [true, "Please input your password"],
    trim: true,
    minlength: [8, "Password must be more than or equal to 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validiator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
