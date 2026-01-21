import React, { useState } from "react";

export default function ChatBot({
  setRoom,
  setStyle,
  setPalette,
  setModifierPrompt,   
  handleGenerate,
}) {

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("main");
  const [customPrompt, setCustomPrompt] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);

  const roomOptions = [
    "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room",
    "Office", "Study Room", "Balcony", "Guest Room", "Kids Room",
    "Library", "Home Theater",
  ];
  const styleOptions = [
    "Modern", "Bohemian", "Minimalist", "Rustic", "Industrial",
    "Scandinavian", "Vintage", "Coastal", "Contemporary", "Traditional",
    "Farmhouse", "Tropical",
  ];
  const paletteOptions = [
    "Warm tones", "Cool tones", "Neutral tones", "Monochrome",
    "Vibrant", "Pastel", "Earthy", "Luxury Gold", "Nature Greens",
    "Ocean Blue", "Sunset Hues", "Rose Blush",
  ];

function handleSelect(type, value) {
  if (type === "room") {
    setRoom(value);

    // 🔥 VERY IMPORTANT
    setModifierPrompt(""); // reset old colors/styles
  }

  if (type === "style") {
    setStyle(value);
    setModifierPrompt(`in ${value} style`);
  }

  if (type === "palette") {
    setPalette(value);
    setModifierPrompt(`${value} color palette, ${value} wall colors`);
  }
}




function handleCustomGenerate() {
  if (!customPrompt.trim()) return;

  setModifierPrompt(customPrompt);
  handleGenerate(customPrompt); // one-time override
  setCustomPrompt(""); // 🔥 CLEAR IT
}



  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => {
    setOpen(!open);
    if (!open) {
      setStep("main"); // ✅ always start fresh
    }
  }}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
          border: "none",
          boxShadow: "0 8px 24px rgba(101, 37, 37, 0.35)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 3000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(101, 37, 37, 0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(101, 37, 37, 0.35)";
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFDF7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "110px",
            right: "30px",
            width: "400px",
            maxHeight: "600px",
            background: "rgba(255, 253, 247, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(101, 37, 37, 0.25)",
            border: "2px solid rgba(212, 175, 55, 0.3)",
            zIndex: 2500,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <style>
            {`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid rgba(212, 175, 55, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(212, 175, 55, 0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#652525"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#FFFDF7",
                    letterSpacing: "0.3px",
                  }}
                >
                  AI Design Assistant
                </h3>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false);
    setStep("main"); // ✅ reset to main
  }}
              style={{
                background: "rgba(255, 253, 247, 0.2)",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 253, 247, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 253, 247, 0.2)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFDF7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div
            style={{
              flex: 1,
              padding: "24px",
              overflowY: "auto",
              maxHeight: "480px",
            }}
          >
            {/* MAIN MENU */}
            {step === "main" && (
              <div>
                <p
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "14px",
                    color: "#5A3A3A",
                    lineHeight: "1.6",
                  }}
                >
                  What would you like to customize?
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button
                    onClick={() => setStep("room")}
                    style={{
                      padding: "16px",
                      background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#FFFDF7",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(101, 37, 37, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(101, 37, 37, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(101, 37, 37, 0.2)";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>🏠</span>
                    Change Room
                  </button>

                  <button
                    onClick={() => setStep("style")}
                    style={{
                      padding: "16px",
                      background: "linear-gradient(135deg, #8B6F47 0%, #A67C52 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#FFFDF7",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(139, 111, 71, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(139, 111, 71, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 111, 71, 0.2)";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>🎨</span>
                    Change Style
                  </button>

                  <button
                    onClick={() => setStep("palette")}
                    style={{
                      padding: "16px",
                      background: "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#652525",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(212, 175, 55, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(212, 175, 55, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 175, 55, 0.2)";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>🌈</span>
                    Change Palette
                  </button>
                </div>

                {/* Custom Prompt */}
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "24px",
                    borderTop: "1px solid rgba(101, 37, 37, 0.1)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "13px",
                      color: "#8B6F47",
                      fontWeight: "500",
                    }}
                  >
                    Or describe your own design:
                  </p>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. Cozy modern living room with warm lights..."
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      padding: "12px",
                      fontSize: "14px",
                      border: "2px solid rgba(101, 37, 37, 0.15)",
                      borderRadius: "10px",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                      color: "#5A3A3A",
                      background: "rgba(255, 253, 247, 0.5)",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#D4AF37";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(101, 37, 37, 0.15)";
                    }}
                  />
                  <button
                    onClick={handleCustomGenerate}
                    disabled={!customPrompt.trim()}
                    style={{
                      width: "100%",
                      marginTop: "12px",
                      padding: "14px",
                      background: customPrompt.trim()
                        ? "linear-gradient(135deg, #652525 0%, #8B3333 100%)"
                        : "rgba(101, 37, 37, 0.3)",
                      border: "none",
                      borderRadius: "10px",
                      color: customPrompt.trim() ? "#FFFDF7" : "rgba(255, 253, 247, 0.5)",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: customPrompt.trim() ? "pointer" : "not-allowed",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <span>⚡</span>
                    Regenerate Design
                  </button>
                </div>
              </div>
            )}

            {/* ROOM OPTIONS */}
            {step === "room" && (
              <div>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "14px",
                    color: "#5A3A3A",
                    fontWeight: "500",
                  }}
                >
                  Select a room type:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {roomOptions.map((room, index) => (
                    <button
                      key={room}
                      onClick={() => handleSelect("room", room)}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        padding: "12px 16px",
                        background: hoveredOption === index
                          ? "rgba(212, 175, 55, 0.15)"
                          : "transparent",
                        border: "1px solid rgba(101, 37, 37, 0.2)",
                        borderRadius: "10px",
                        color: "#5A3A3A",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                    >
                      {room}
                    </button>
                  ))}
                  <button
                    onClick={() => setStep("main")}
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: "transparent",
                      border: "2px solid rgba(101, 37, 37, 0.3)",
                      borderRadius: "10px",
                      color: "#8B6F47",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)";
                      e.currentTarget.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(101, 37, 37, 0.3)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
  onClick={() => {
    handleGenerate(); // generate using current room/style/palette
    setOpen(false);   // optional: close chatbot
  }}
  style={{
    marginTop: "20px",
    padding: "16px",
    background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
    border: "none",
    borderRadius: "12px",
    color: "#FFFDF7",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 16px rgba(101, 37, 37, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }}
>
  ⚡ Generate with Current Changes
</button>

                </div>
              </div>
            )}

            {/* STYLE OPTIONS */}
            {step === "style" && (
              <div>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "14px",
                    color: "#5A3A3A",
                    fontWeight: "500",
                  }}
                >
                  Select a design style:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {styleOptions.map((style, index) => (
                    <button
                      key={style}
                      onClick={() => handleSelect("style", style)}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        padding: "12px 16px",
                        background: hoveredOption === index
                          ? "rgba(212, 175, 55, 0.15)"
                          : "transparent",
                        border: "1px solid rgba(139, 111, 71, 0.3)",
                        borderRadius: "10px",
                        color: "#5A3A3A",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                    >
                      {style}
                    </button>
                  ))}
                  <button
                    onClick={() => setStep("main")}
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: "transparent",
                      border: "2px solid rgba(101, 37, 37, 0.3)",
                      borderRadius: "10px",
                      color: "#8B6F47",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)";
                      e.currentTarget.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(101, 37, 37, 0.3)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
  onClick={() => {
    handleGenerate(); // generate using current room/style/palette
    setOpen(false);   // optional: close chatbot
  }}
  style={{
    marginTop: "20px",
    padding: "16px",
    background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
    border: "none",
    borderRadius: "12px",
    color: "#FFFDF7",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 16px rgba(101, 37, 37, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }}
>
  ⚡ Generate with Current Changes
</button>

                </div>
              </div>
            )}

            {/* PALETTE OPTIONS */}
            {step === "palette" && (
              <div>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "14px",
                    color: "#5A3A3A",
                    fontWeight: "500",
                  }}
                >
                  Select a color palette:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {paletteOptions.map((palette, index) => (
                    <button
                      key={palette}
                      onClick={() => handleSelect("palette", palette)}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        padding: "12px 16px",
                        background: hoveredOption === index
                          ? "rgba(212, 175, 55, 0.15)"
                          : "transparent",
                        border: "1px solid rgba(212, 175, 55, 0.3)",
                        borderRadius: "10px",
                        color: "#5A3A3A",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                    >
                      {palette}
                    </button>
                  ))}
                  <button
                    onClick={() => setStep("main")}
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: "transparent",
                      border: "2px solid rgba(101, 37, 37, 0.3)",
                      borderRadius: "10px",
                      color: "#8B6F47",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)";
                      e.currentTarget.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(101, 37, 37, 0.3)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
  onClick={() => {
    handleGenerate(); // generate using current room/style/palette
    setOpen(false);   // optional: close chatbot
  }}
  style={{
    marginTop: "20px",
    padding: "16px",
    background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
    border: "none",
    borderRadius: "12px",
    color: "#FFFDF7",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 16px rgba(101, 37, 37, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }}
>
  ⚡ Generate with Current Changes
</button>

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}