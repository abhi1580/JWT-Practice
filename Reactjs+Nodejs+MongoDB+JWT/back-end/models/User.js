const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");
//userschema with timestamps

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Minimum length of password is 6 characters"],
    },
  },
  { timestamps: true }
);

//fire a function before document saved to db
//doc will not be used here beacouse doc is not created yet before this operation
userSchema.pre("save", async function (next) {
  //user is about to create
  //   console.log(this);
  //generate salt
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//fire a function before document saved to db
//doc will be used here beacouse doc is created

// userSchema.post("save", function (doc, next) {
//   console.log("doc saved", doc);
//   next();
// });
// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
