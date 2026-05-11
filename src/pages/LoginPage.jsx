import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Logo from "../assets/images/logo-Pink.png";//imported logo image
import winAudio from "../assets/audios/audio-start.mp3";//imported audio

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    username: "",
    password: "",
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

  // Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.username.trim() ||
      !form.password.trim()
    ) {
      setError("Please fill all fields");
      return;
    }
    //saves username and password in localstorage
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    //validation for username and password
    if (
      form.username === savedUsername &&
      form.password === savedPassword
    ) {
      setMessage("Login successful");

      localStorage.setItem("loggedInUser", form.username);

      stopAudio();

      setTimeout(() => {
        navigate("/startPlay");
      }, 1000);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div
        className="w-100 p-4 rounded-3 login-card position-relative"
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
            right: "0px",
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
          ></i>
        </div>

        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Squid Game logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "250px" }}
          />

          <h2 className="squid-title">
            Squid Game
          </h2>

          <p>Welcome back, player</p>
        </div>

        {/* Quote */}
        <div className="quote-box text-center mb-4 px-3">
          <p className="fst-italic">
            "The most dangerous animal in the
            world is a silent, smiling person."
          </p>

          {error && (
            <p className="text-danger text-center">
              {error}
            </p>
          )}

          {message && (
            <p className="text-success text-center">
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
              className="custom-input form-control"
              placeholder="Enter username"
              value={form.username}
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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                className="custom-input form-control pe-5"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold login-btn"
          >
            LOGIN
          </button>
        </form>

        {/* Register */}
        <p className="text-center mt-3">
          No account?{" "}
          <span
            onClick={() =>
              handleNavigate("/register")
            }
            className="text-decoration-underline"
            style={{
              cursor: "pointer",
              color: "#E40166",
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
