import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://stock-platform-4u7q.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Account created successfully!");

      setTimeout(() => {
        window.location.href =
          "http://localhost:3001?token=" +
          encodeURIComponent(data.token);
      }, 1200);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-info">
          <div className="auth-logo">
            <span>ZERODHA</span>
          </div>

          <h1>
            Invest in your
            <br />
            <span>future.</span>
          </h1>

          <p>
            Open your account and start investing
            in stocks, mutual funds and more.
          </p>

          <div className="auth-features">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <span>
                Simple and transparent investing
              </span>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>
              <span>
                Powerful trading dashboard
              </span>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>
              <span>
                Track your portfolio in one place
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create your account</h2>

            <p>
              Enter your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label>Confirm Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {message && (
              <div className="auth-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>

            <p className="login-text">
              Already have an account?

              <span
                onClick={() =>
                  navigate("/login")
                }
              >
                {" "}Log in
              </span>
            </p>

          </form>
        </div>
      </div>

      <div className="auth-footer">
        © 2026 Stock Platform. All rights reserved.
      </div>
    </div>
  );
};

export default Signup;