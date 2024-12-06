import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({ fname: "", email: "", password: "" });
  const [confirmPassword, setConformPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      const fetchedData = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await fetchedData.json();
      console.log(response.errors);
      if (response.errors) {
        setErrors(response.errors);
      } else {
        alert("You are signed up successfully");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handelSubmit}>
          {/* Full Name Input */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              onChange={(e) => setData({ ...data, fname: e.target.value })}
              value={data.fname}
              placeholder="Enter your full name"
              required
            />
          </div>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email"
              placeholder="Enter your email"
              required
            />
            <span>{errors.email}</span>
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
              placeholder="Enter your password"
              required
            />
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

          {/* Sign Up Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        {/* Additional Links */}
        <div className="text-center mt-3">
          <p className="mt-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
