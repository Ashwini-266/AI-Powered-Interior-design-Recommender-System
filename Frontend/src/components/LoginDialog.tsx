import React, { useState, useEffect } from "react";

const BG_IMAGE = "/images/livingroom.jpeg";

interface LoginDialogProps {
  setIsLoggedIn: (value: boolean) => void;
  setShowLogin: (value: boolean) => void;
  setShowRegister: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}


export default function LoginDialog({
  setIsLoggedIn,
  setShowLogin,
  setShowRegister,
  setCurrentUser,
}: LoginDialogProps) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  // Check login state on mount


  // Handle login submit
async function handleLoginSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8787/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    sessionStorage.setItem("isLoggedIn", "true");
sessionStorage.setItem("currentUser", JSON.stringify(data.user));

    setCurrentUser(data.user)
    setIsLoggedIn(true);
    setShowLogin(false);

  } catch (err) {
    setError("Server error");
  }
}

const handleExploreAsGuest = () => {
  setShowLogin(false);   // close login modal
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
      }}
      onClick={() => setShowLogin(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 253, 247, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "48px 40px",
          boxShadow: "0 20px 60px rgba(101, 37, 37, 0.15)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo/Brand Area */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
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
            Welcome Back
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              color: "#8B6F47",
              fontWeight: "400",
            }}
          >
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleLoginSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: "20px" }}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField("")}
              autoFocus
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

          {/* Password Field */}
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
  type="submit"
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
>
  Sign In
</button>


          {/* Register Link */}
          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "14px",
              color: "#8B6F47",
            }}
          >
            Don't have an account?{" "}
            <button
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
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
              Sign Up
            </button>
          </div>
          {/* Explore as Guest */}
<div
  onClick={handleExploreAsGuest}
  style={{
    marginTop: "18px",
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

          </form>
        </div>
      </div>
    
  );
}