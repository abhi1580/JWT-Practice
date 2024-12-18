import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedData = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const response = await fetchedData.json();
      console.log(response);
      // If there are any errors from the backend, set them
      if (response.errors) {
        setErrors(response.errors);
      } else {
        alert("You are logged in successfully");
        navigate("/"); // Redirect to home page after successful sign-in
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg p-4 border-0 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
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
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Login
          </button>
        </form>
        {/* Additional Links */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-primary text-decoration-none fw-bold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
