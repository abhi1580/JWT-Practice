const User = require("../models/User");
const jwt = require("jsonwebtoken");
//handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //duplicate error code

  if (err.code === 11000) {
    errors.email = "Email is already exists";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    //validation errors
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", { expiresIn: maxage });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
    // console.log(user._id);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  res.send("user login");
};