import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import RoomSelection from "./components/RoomSelection";
import StyleSelection from "./components/StyleSelection";
import PaletteSelection from "./components/PaletteSelection";
import GenerationSection from "./components/GenerationSection";
import CustomPromptPage from "./components/CustomPromptPage";
import LoginDialog from "./components/LoginDialog";
import RegisterDialog from "./components/RegisterDialog";

const roomOptions = [
  { label: "Living Room", image: "/images/livingroom.jpeg" },
  { label: "Bedroom", image: "/images/diningroom.jpeg" },
  { label: "Garden", image: "/images/garden.jpeg" },
  { label: "Kitchen", image: "/images/kitchen.jpeg" },
];

const styleOptions = [
  { label: "Modern", image: "/images/Modern.jpeg" },
  { label: "Minimalistic", image: "/images/Minimalistic.png" },
  { label: "Bohemian", image: "/images/bohemian.jpeg" },
  { label: "Rustic", image: "/images/rustic.jpeg" },
];

const paletteOptions = [
  { label: "Fuschia Blosson", image: "/images/forest_hues.png" },
  { label: "Terracotta Mirage", image: "/images/turqoiseLogon.png" },
  { label: "Millennial Gray", image: "/images/MillennialGrey.png" },
  { label: "Turqoise Logon", image: "/images/turqoiseLogon.png" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return sessionStorage.getItem("isLoggedIn") === "true";
});

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [step, setStep] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
 const [currentUser, setCurrentUser] = useState(() => {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
});
const [promptMode, setPromptMode] = useState(null);
// "custom" | "selection"




  // Generation states
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");
  const [palette, setPalette] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Selection state for each step
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedPalette, setSelectedPalette] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");

  // Custom prompt state
  const [customPrompt, setCustomPrompt] = useState("");


useEffect(() => {
  if (isLoggedIn) {
    setShowLogin(false);
    setShowRegister(false);
  }
}, [isLoggedIn]);

  function handleLoginOpen() {
  if (!isLoggedIn) {
    setShowLogin(true);
  }
}


  function handleRegisterOpen() {
    setShowRegister(true);
  }

  function handleLogout() {
  sessionStorage.removeItem("isLoggedIn");
sessionStorage.removeItem("currentUser");

  setIsLoggedIn(false);
  setCurrentUser(null);
  setStep(0);
  window.dispatchEvent(new Event("logout"));
}


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 100%)",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          background: "rgba(255, 253, 247, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid rgba(212, 175, 55, 0.2)",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(101, 37, 37, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src="/images/logo.jpeg"
            alt="Logo"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid #D4AF37",
              boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
            }}
          />
          <img
            src="/images/logo_name.jpeg"
            alt="Brand Name"
            style={{
              height: "28px",
              width: "auto",
            }}
          />
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Login Status Indicator */}
          {isLoggedIn && currentUser && (
  <div
    style={{
      padding: "8px 16px",
      background: "rgba(212, 175, 55, 0.12)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "1px solid rgba(212, 175, 55, 0.4)",
    }}
  >
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#4CAF50",
        boxShadow: "0 0 8px rgba(76, 175, 80, 0.6)",
      }}
    />
    <span
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#652525",
      }}
    >
      {currentUser.username || currentUser.name}
    </span>
  </div>
)}


          {/* Register Button */}
          {!isLoggedIn && (
            <button
              onClick={handleRegisterOpen}
              onMouseEnter={() => setHoveredButton("register")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                color: hoveredButton === "register" ? "#652525" : "#8B6F47",
                background:
                  hoveredButton === "register"
                    ? "rgba(212, 175, 55, 0.15)"
                    : "transparent",
                border: `2px solid ${
                  hoveredButton === "register"
                    ? "#D4AF37"
                    : "rgba(139, 111, 71, 0.3)"
                }`,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
                transform:
                  hoveredButton === "register"
                    ? "translateY(-1px)"
                    : "translateY(0)",
              }}
            >
              SIGN UP
            </button>
          )}

          {/* Login Button */}
          <button
            onClick={handleLoginOpen}
            disabled={isLoggedIn}
            onMouseEnter={() => setHoveredButton("login")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: "600",
              color: isLoggedIn ? "rgba(255, 253, 247, 0.5)" : "#FFFDF7",
              background: isLoggedIn
                ? "rgba(101, 37, 37, 0.3)"
                : hoveredButton === "login"
                ? "linear-gradient(135deg, #8B3333 0%, #652525 100%)"
                : "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
              border: "none",
              borderRadius: "10px",
              cursor: isLoggedIn ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: isLoggedIn
                ? "none"
                : hoveredButton === "login"
                ? "0 6px 16px rgba(101, 37, 37, 0.3)"
                : "0 4px 12px rgba(101, 37, 37, 0.25)",
              letterSpacing: "0.5px",
              transform:
                hoveredButton === "login" && !isLoggedIn
                  ? "translateY(-1px)"
                  : "translateY(0)",
            }}
          >
            LOGIN
          </button>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoveredButton("logout")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                color:
                  hoveredButton === "logout" ? "#652525" : "#8B6F47",
                background:
                  hoveredButton === "logout"
                    ? "rgba(212, 175, 55, 0.15)"
                    : "transparent",
                border: `2px solid ${
                  hoveredButton === "logout"
                    ? "#D4AF37"
                    : "rgba(139, 111, 71, 0.3)"
                }`,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
                transform:
                  hoveredButton === "logout"
                    ? "translateY(-1px)"
                    : "translateY(0)",
              }}
            >
              LOGOUT
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {step === 0 && <HomeScreen isLoggedIn={isLoggedIn} setStep={setStep} />}
        
        {step === 1 && (
          <RoomSelection
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            setRoom={setRoom}
            setStep={setStep}
            roomOptions={roomOptions}
          />
        )}
        {step === 2 && (
          <StyleSelection
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            setStyle={setStyle}
            setStep={setStep}
            styleOptions={styleOptions}
          />
        )}
        {step === 3 && (
          <PaletteSelection
            selectedPalette={selectedPalette}
            setSelectedPalette={setSelectedPalette}
            setPalette={setPalette}
            setStep={setStep}
            paletteOptions={paletteOptions}
          />
        )}
        {step === 4 && (
          <GenerationSection
            room={room}
            style={style}
            palette={palette}
            customPrompt={customPrompt}
            setGeneratedImage={setGeneratedImage}
            generatedImage={generatedImage}
            setLoading={setLoading}
            loading={loading}
            setError={setError}
            error={error}
            setStep={setStep}
            setRoom={setRoom}
            setStyle={setStyle}
            setPalette={setPalette}
          />
        )}
        {step === 5 && (
          <CustomPromptPage
            setCustomPrompt={setCustomPrompt}
            onContinue={() => {
              setRoom("");
              setStyle("");
              setPalette("");
              setStep(4);
            }}
            onCustom={() => setStep(1)}
          />
        )}
        
        {/* Login Dialog */}
        {showLogin && !isLoggedIn && (
  <LoginDialog
    setIsLoggedIn={setIsLoggedIn}
    setShowLogin={setShowLogin}
    setShowRegister={setShowRegister}
    setCurrentUser={setCurrentUser} 
  />
)}


        {/* Register Dialog */}
        {showRegister && (
          <RegisterDialog
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
          />
        )}
      </div>
    </div>
  );
}