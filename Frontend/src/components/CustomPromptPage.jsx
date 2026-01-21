import React, { useState } from "react";

export default function CustomPromptPage({
  setCustomPrompt,
  onContinue,
  onCustom,
}) {
  const [localPrompt, setLocalPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [convertedPrompt, setConvertedPrompt] = useState("");
const [showConverted, setShowConverted] = useState(false);


// Simple conversion function for demonstration purposes
function convertToSDPrompt(text) {
  const lower = text.toLowerCase();

  let promptParts = [];
  let negativeParts = [];

  /* ---------- ROOM DETECTION ---------- */
  let roomDetected = false;

  const rooms = [
    { key: "kitchen", value: "kitchen interior" },
    { key: "bedroom", value: "bedroom interior" },
    { key: "living", value: "living room interior" },
    { key: "dining", value: "dining room interior" },
    { key: "bathroom", value: "bathroom interior" },
    { key: "office", value: "home office interior" },
  ];

  rooms.forEach((room) => {
    if (lower.includes(room.key)) {
      promptParts.push(room.value);
      roomDetected = true;
    }
  });

  // 🔒 Always force interior context
  if (!roomDetected) {
    promptParts.push("interior room, architectural interior");
  }

  /* ---------- COLOR HANDLING ---------- */
  const colors = [
    "orange",
    "blue",
    "green",
    "white",
    "black",
    "grey",
    "gray",
    "beige",
    "brown",
    "yellow",
  ];

  colors.forEach((color) => {
    if (lower.includes(color)) {
      promptParts.push(
        `${color} color palette`,
        `${color} accent walls`,
        `${color} furniture accents`
      );
    }
  });

  /* ---------- STYLE / MOOD ---------- */
  if (lower.includes("modern")) {
    promptParts.push("modern interior design");
  }
  if (lower.includes("minimal")) {
    promptParts.push("minimalist interior");
  }
  if (lower.includes("luxury")) {
    promptParts.push("luxury interior, premium materials");
  }
  if (lower.includes("cozy")) {
    promptParts.push("cozy atmosphere, warm lighting");
  }

  /* ---------- CAMERA & QUALITY (VERY IMPORTANT) ---------- */
  promptParts.push(
    "realistic interior design",
    "architectural photography",
    "wide angle interior shot",
    "soft natural lighting",
    "high detail",
    "4k"
  );

  /* ---------- NEGATIVE PROMPT (CRITICAL) ---------- */
  negativeParts.push(
    "fruit",
    "food",
    "still life",
    "plate",
    "bowl",
    "utensils",
    "text",
    "logo",
    "watermark",
    "low quality",
    "blurry"
  );

  return {
    prompt: promptParts.join(", "),
    negative: negativeParts.join(", "),
  };
}




const handleConvert = () => {
  const result = convertToSDPrompt(localPrompt);
  setConvertedPrompt(result.prompt);
  setShowConverted(true);
};

const handleContinue = () => {
  const finalPrompt = convertedPrompt || localPrompt;

  setCustomPrompt(finalPrompt);
  onContinue(); // ✅ now this will execute
};


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "rgba(255, 253, 247, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "56px 48px",
          boxShadow: "0 20px 60px rgba(101, 37, 37, 0.12)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "56px",
              height: "4px",
              background: "linear-gradient(90deg, #652525 0%, #D4AF37 100%)",
              margin: "0 auto 24px",
              borderRadius: "2px",
            }}
          />
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: "28px",
              fontWeight: "600",
              color: "#652525",
              letterSpacing: "-0.5px",
            }}
          >
            Describe Your Vision
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              color: "#8B6F47",
              fontWeight: "400",
              lineHeight: "1.6",
            }}
          >
            Tell us what you'd like to create with AI
          </p>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: "32px" }}>
          <textarea
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your creative prompt here... Be as detailed as you'd like."
            style={{
              width: "100%",
              minHeight: "180px",
              padding: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#652525",
              background: "rgba(255, 253, 247, 0.6)",
              border: `2px solid ${
                isFocused
                  ? "#D4AF37"
                  : "rgba(101, 37, 37, 0.15)"
              }`,
              borderRadius: "16px",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              color: localPrompt.trim() ? "#8B6F47" : "rgba(139, 111, 71, 0.5)",
              textAlign: "right",
              fontWeight: "500",
            }}
          >
            {localPrompt.trim().length} characters
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          <button
  onClick={handleConvert}
  disabled={!localPrompt.trim()}
  style={{
    padding: "18px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: localPrompt.trim() ? "#652525" : "rgba(101,37,37,0.4)",
    background: "rgba(212, 175, 55, 0.15)",
    border: "2px solid #D4AF37",
    borderRadius: "14px",
    cursor: localPrompt.trim() ? "pointer" : "not-allowed",
  }}
>
  Convert Prompt
</button>
{showConverted && (
  <div style={{ marginBottom: "32px" }}>
    <label
      style={{
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#652525",
        marginBottom: "8px",
      }}
    >
      Converted AI Prompt (Editable)
    </label>

    <textarea
      value={convertedPrompt}
      onChange={(e) => setConvertedPrompt(e.target.value)}
      style={{
        width: "100%",
        minHeight: "140px",
        padding: "18px",
        fontSize: "15px",
        lineHeight: "1.6",
        color: "#652525",
        background: "rgba(255, 253, 247, 0.7)",
        border: "2px solid #D4AF37",
        borderRadius: "14px",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
      }}
    />
  </div>
)}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!localPrompt.trim()}
            onMouseEnter={() => setHoveredButton("continue")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: "18px 32px",
              fontSize: "16px",
              fontWeight: "600",
              color: localPrompt.trim() ? "#FFFDF7" : "rgba(255, 253, 247, 0.5)",
              background: localPrompt.trim()
                ? hoveredButton === "continue"
                  ? "linear-gradient(135deg, #8B3333 0%, #652525 100%)"
                  : "linear-gradient(135deg, #652525 0%, #8B3333 100%)"
                : "rgba(101, 37, 37, 0.3)",
              border: "none",
              borderRadius: "14px",
              cursor: localPrompt.trim() ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: localPrompt.trim()
                ? hoveredButton === "continue"
                  ? "0 8px 24px rgba(101, 37, 37, 0.35)"
                  : "0 6px 20px rgba(101, 37, 37, 0.25)"
                : "none",
              letterSpacing: "0.3px",
              transform:
                hoveredButton === "continue" && localPrompt.trim()
                  ? "translateY(-2px)"
                  : "translateY(0)",
            }}
          >
            Continue with Prompt
          </button>

          {/* Custom Generation Button */}
          <button
            onClick={onCustom}
            onMouseEnter={() => setHoveredButton("custom")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: "18px 32px",
              fontSize: "16px",
              fontWeight: "600",
              color: hoveredButton === "custom" ? "#652525" : "#8B6F47",
              background:
                hoveredButton === "custom"
                  ? "rgba(212, 175, 55, 0.15)"
                  : "transparent",
              border: `2px solid ${
                hoveredButton === "custom"
                  ? "#D4AF37"
                  : "rgba(139, 111, 71, 0.3)"
              }`,
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.3px",
              transform:
                hoveredButton === "custom"
                  ? "translateY(-2px)"
                  : "translateY(0)",
            }}
          >
            Advanced Custom Generation
          </button>
        </div>

        {/* Helper Text */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "rgba(212, 175, 55, 0.08)",
            borderRadius: "12px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#8B6F47",
                lineHeight: "1.6",
                fontWeight: "500",
              }}
            >
              <strong style={{ color: "#652525" }}>Pro tip:</strong> The more
              details you provide, the better your AI-generated results will be.
              Describe colors, styles, moods, and specific elements you want to
              include.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}