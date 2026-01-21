import React, { useState } from "react";

const BG_IMAGE = "/images/livingroom.jpeg";

export default function RegisterDialog({ setShowRegister, setShowLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
  if (!formData.password) {
  setError("Password is required");
  return false;
}

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

if (!strongPasswordRegex.test(formData.password)) {
  setError(
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
  );
  return false;
}



    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const res = await fetch("http://localhost:8787/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setShowRegister(false);
      setShowLogin(true);
    }, 2000);

  } catch (err) {
    setError("Server error, try again later");
  }
};

const handleExploreAsGuest = () => {
  setShowRegister(false); // close register modal
};



  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto",
      }}
      onClick={() => setShowRegister(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(255, 253, 247, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "48px 40px",
          boxShadow: "0 20px 60px rgba(101, 37, 37, 0.15)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          margin: "20px 0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo/Brand Area */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(101, 37, 37, 0.2)",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFDF7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "600",
              color: "#652525",
              letterSpacing: "-0.5px",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              color: "#8B6F47",
              fontWeight: "400",
            }}
          >
            Join us to explore amazing designs
          </p>
        </div>

        {success ? (
          <div
            style={{
              padding: "24px",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "2px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                margin: "0 auto 16px",
                background: "rgba(34, 197, 94, 0.15)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#166534",
              }}
            >
              Registration Successful!
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#15803D",
              }}
            >
              Redirecting to login...
            </p>
          </div>
        ) : (
          <div>
            {/* Full Name */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField("")}
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: `2px solid ${
                    focusedField === "fullName"
                      ? "#D4AF37"
                      : "rgba(101, 37, 37, 0.15)"
                  }`,
                  borderRadius: "12px",
                  outline: "none",
                  backgroundColor: "rgba(255, 253, 247, 0.5)",
                  color: "#652525",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: `2px solid ${
                    focusedField === "email"
                      ? "#D4AF37"
                      : "rgba(101, 37, 37, 0.15)"
                  }`,
                  borderRadius: "12px",
                  outline: "none",
                  backgroundColor: "rgba(255, 253, 247, 0.5)",
                  color: "#652525",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Username */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField("")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: `2px solid ${
                    focusedField === "username"
                      ? "#D4AF37"
                      : "rgba(101, 37, 37, 0.15)"
                  }`,
                  borderRadius: "12px",
                  outline: "none",
                  backgroundColor: "rgba(255, 253, 247, 0.5)",
                  color: "#652525",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: `2px solid ${
                    focusedField === "password"
                      ? "#D4AF37"
                      : "rgba(101, 37, 37, 0.15)"
                  }`,
                  borderRadius: "12px",
                  outline: "none",
                  backgroundColor: "rgba(255, 253, 247, 0.5)",
                  color: "#652525",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField("")}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: `2px solid ${
                    focusedField === "confirmPassword"
                      ? "#D4AF37"
                      : "rgba(101, 37, 37, 0.15)"
                  }`,
                  borderRadius: "12px",
                  outline: "none",
                  backgroundColor: "rgba(255, 253, 247, 0.5)",
                  color: "#652525",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  marginBottom: "20px",
                  backgroundColor: "rgba(220, 38, 38, 0.08)",
                  border: "1px solid rgba(220, 38, 38, 0.2)",
                  borderRadius: "10px",
                  fontSize: "13px",
                  color: "#991B1B",
                  fontWeight: "500",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#FFFDF7",
                background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(101, 37, 37, 0.25)",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(101, 37, 37, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(101, 37, 37, 0.25)";
              }}
            >
              Create Account
            </button>

            {/* Login Link */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "14px",
                color: "#8B6F47",
              }}
            >
              Already have an account?{" "}
              <button
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#652525",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                  fontSize: "14px",
                }}
              >
                Sign In
              </button>
            </div>
            {/* Explore as Guest */}
<div
  onClick={handleExploreAsGuest}
  style={{
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#652525",
    cursor: "pointer",
    fontWeight: "600",
    opacity: 0.85,
  }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
>
  Explore as Guest →
</div>

          </div>
        )}
      </div>
    </div>
  );
}