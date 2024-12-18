import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({ fname: "", email: "", password: "" });
  const [confirmPassword, setConformPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password are the same
    if (data.password !== confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    try {
      const fetchedData = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const response = await fetchedData.json();

      // If there are any errors from the backend, set them
      if (response.errors) {
        setErrors(response.errors);
      } else {
        alert("You are signed up successfully");
        // navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      console.log(err);
      setErrors({ general: "Something went wrong, please try again." });
    }
  };
  // console.log(errors);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg p-4 border-0 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-primary">Create an Account</h2>
        <form onSubmit={handelSubmit}>
          {/* Full Name Input */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.fname ? "is-invalid" : ""}`}
              id="fullName"
              onChange={(e) => setData({ ...data, fname: e.target.value })}
              value={data.fname}
              placeholder="Enter your full name"
              required
            />
            {errors.fname && (
              <div className="invalid-feedback">{errors.fname}</div>
            )}
          </div>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          {/* Confirm Password Input */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setConformPassword(e.target.value)}
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-3 text-danger">{errors.general}</div>
          )}
          {/* Sign Up Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Sign Up
          </button>
        </form>
        {/* Additional Links */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-primary text-decoration-none fw-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
