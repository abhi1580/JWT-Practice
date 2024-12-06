const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimum length of password is 6 characters"],
  },
});

//fire a function before document saved to db

userSchema.pre("save", async function (next) {
  //user is about to create
  //   console.log(this);
  //generate salt
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
