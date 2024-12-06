const User = require("../models/User");
//check errors
const handleErrors = (err) => {
  //   console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
    return errors;
  }
  if (err.message === "Incorrect password") {
    errors.password = "That password isincorrect";
    return errors;
  }

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
module.exports.login_post = (req, res) => {};
module.exports.signup_post = async (req, res) => {
  const user = req.body;
  try {
    // console.log(user);
    const result = await User.create(user);
    // console.log(result);
    res.status(201).json({ user: result.fname });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
