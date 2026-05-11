//form UI + validation + page layout ALL HERE (Auth API also)
// Navigation 
// - Create Account ---> success --> PlayerSelection
// - login link ---> back to login page


import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import Logo from "../assets/images/logo-Pink.png";
import winAudio from "../assets/audios/audio-start.mp3";//imported audio

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Load audio
  useEffect(() => {
    audioRef.current = new Audio(winAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play audio
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  // Navigation + Stop Audio
  const handleNavigate = (path) => {
    stopAudio();
    navigate(path);
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  // Handle register
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.username.trim() ||
        !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      setError("Please fill all fields");
      return;
    }
    // validation for email
    if (!emailPattern.test(form.email)) {
      setError("Enter valid email");
      return;
    }
    if (form.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save locally
    localStorage.setItem("username", form.username);
    localStorage.setItem("password", form.password);
    localStorage.setItem("email", form.email);

    setMessage("Account created successfully");

    // Navigate to login page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div
        className="w-100 p-4 rounded-3 register-card position-relative"
        style={{
          maxWidth: "500px",
          width: "100%",
          border: "2px solid #E40166",
        }}
      >
        {/* Audio Icon */}
        <div
          onClick={toggleAudio}
          style={{
            position: "absolute",
            left: "-60px",
            bottom: "-15px",
            cursor: "pointer",
            fontSize: "40px",
            color: "#E40166",
            zIndex: 10,
          }}
        >
          <i
            className={
              isPlaying
                ? "bi bi-volume-up-fill"
                : "bi bi-volume-mute-fill"
            }
          >

          </i>
          </div>
        {/* Logo  */}
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Squid Game logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "250px" }}
          />

          <h2 className="squid-title">Create Account</h2>

          <p style={{ fontWeight: "bold" }}>Join the game</p>
        </div>

        {/* Message Area */}
        <div className="text-center mb-3">
          {error && (
            <p className="text-danger">
              {error}
            </p>
          )}

          {message && (
            <p className="text-success">
              {message}
            </p>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
        >
          {/* Username */}
          <div>
            <label className="form-label text-center w-100">
              Username
            </label>

            <input
              type="text"
              name="username"
              className="form-control custom-input"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div>
            <label className="form-label text-center w-100">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control custom-input"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label text-center w-100">
              Password
            </label>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control custom-input pe-5"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{
                  cursor: "pointer",
                  color: "#E40166",
                }}
              >
                <i
                  className={
                    showPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                ></i>
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label text-center w-100">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control custom-input"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold register-btn"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-decoration-underline"
            style={{
              cursor: "pointer",
              color: "#E40166",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;