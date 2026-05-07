//form UI + validation + page layout ALL HERE 
// Navigation 
      // - Login ---> Success --> PlayerSelection
      // - Register link ---> Create Account 
  
 // when login done Username need to save in context so can use anywhere
     //Login --> Happened (success) ---> save user to context 

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Logo from "../assets/images/logo-Pink.png";


const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError("Please fill all fields");
      return;
    }

    console.log("Login success:", form.username);

      // navigate to next page
    navigate("/startPlay");
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div
        className="w-100 p-4 rounded-3 login-card"
        style={{
          maxWidth: "500px",
          width: "100%",
          border: "2px solid #E40166",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Squid Game logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "250px" }}
          />
          <h2 className="squid-title">Squid Game</h2>
          <p>Welcome back, player</p>
        </div>

        {/* Quote */}
        <div className="quote-box text-center mb-4 px-3">
          <p className="fst-italic">
            "The most dangerous animal in the world is a silent, smiling
            person."
          </p>
          {error && <p className="text-danger text-center">{error}</p>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label text-center w-100">Username</label>
            <input
              type="text"
              name="username"
              className="custom-input form-control"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label text-center w-100">Password</label>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="custom-input form-control pe-5"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer", color: "#E40166" }}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </span>
            </div>
          </div>

          <button type="submit" className="btn w-100 fw-bold login-btn">
            LOGIN
          </button>
        </form>

        {/* Register */}
        <p className="text-center mt-3">
          No account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-decoration-underline"
            style={{ cursor: "pointer", color: "#E40166" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

