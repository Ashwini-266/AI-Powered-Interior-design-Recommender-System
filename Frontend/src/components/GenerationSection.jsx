import React, { useState, useEffect } from "react";
import ChatBot from "./ChatBot";

export default function GenerationSection({
  room,
  style,
  palette,
  customPrompt,
  setGeneratedImage,
  generatedImage,
  setLoading,
  loading,
  setError,
  error,
  setStep,
  setRoom,
  setStyle,
  setPalette,
}) {
  const [hoveredButton, setHoveredButton] = useState(null);

const [basePrompt, setBasePrompt] = useState("");
const [modifierPrompt, setModifierPrompt] = useState("");

useEffect(() => {
  // ✅ Custom Prompt Mode
  if (customPrompt && !room && !style && !palette) {
    setBasePrompt(customPrompt);
    setModifierPrompt("");
    return;
  }

  // ✅ Selection Mode
  if (room || style || palette) {
    setBasePrompt(
      `A ${style || ""} ${room || ""} interior, ${palette || ""} color palette`
    );
    setModifierPrompt("");
  }
}, [customPrompt, room, style, palette]);





const mergedPrompt = [
  basePrompt,
  modifierPrompt,
  "high quality, realistic, soft lighting, interior design"
].filter(Boolean).join(", ");

const displayPrompt = mergedPrompt;


async function handleGenerate(promptOverride) {
  const promptToUse = promptOverride || mergedPrompt;

  setLoading(true);
  setError("");
  setGeneratedImage(null);

  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptToUse }),
    });

    const blob = await response.blob();
    setGeneratedImage(URL.createObjectURL(blob));
  } catch (err) {
    setError("Generation failed");
  } finally {
    setLoading(false);
  }
}





  function handleDownload() {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated_design.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          padding: "60px 20px 80px",
          background: "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "rgba(255, 253, 247, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0 20px 60px rgba(101, 37, 37, 0.12)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
              Generate Your Design
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                color: "#8B6F47",
                fontWeight: "400",
              }}
            >
              Transform your vision into reality with AI
            </p>
          </div>

          {/* Prompt Display */}
          {displayPrompt && (
            <div
              style={{
                padding: "20px",
                background: "rgba(212, 175, 55, 0.08)",
                borderRadius: "12px",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#652525",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Your Prompt
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "#5A3A3A",
                  lineHeight: "1.6",
                }}
              >
                {displayPrompt}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !displayPrompt}
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              fontWeight: "600",
              color: loading || !displayPrompt ? "rgba(255, 253, 247, 0.5)" : "#FFFDF7",
              background:
                loading || !displayPrompt
                  ? "rgba(101, 37, 37, 0.3)"
                  : "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
              border: "none",
              borderRadius: "14px",
              cursor: loading || !displayPrompt ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                loading || !displayPrompt
                  ? "none"
                  : "0 6px 20px rgba(101, 37, 37, 0.25)",
              letterSpacing: "0.3px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
            onMouseEnter={(e) => {
              if (!loading && displayPrompt) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(101, 37, 37, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && displayPrompt) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(101, 37, 37, 0.25)";
              }
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "3px solid rgba(255, 253, 247, 0.3)",
                    borderTop: "3px solid #FFFDF7",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <span>Generating...</span>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Generate Image</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "16px",
                background: "rgba(220, 38, 38, 0.08)",
                border: "1px solid rgba(220, 38, 38, 0.2)",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#991B1B",
                    fontWeight: "500",
                  }}
                >
                  Error: {error}
                </span>
              </div>
            </div>
          )}

          {/* Generated Image */}
          {generatedImage && (
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                  boxShadow: "0 8px 24px rgba(101, 37, 37, 0.12)",
                }}
              >
                <img
                  src={generatedImage}
                  alt="Generated Design"
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "16px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#652525",
                  background: "rgba(212, 175, 55, 0.15)",
                  border: "2px solid #D4AF37",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Image
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                setGeneratedImage(null);
                setStep(3);
              }}
              onMouseEnter={() => setHoveredButton("back")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                flex: 1,
                minWidth: "140px",
                padding: "16px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#8B6F47",
                background:
                  hoveredButton === "back"
                    ? "rgba(212, 175, 55, 0.1)"
                    : "transparent",
                border: `2px solid ${
                  hoveredButton === "back"
                    ? "#D4AF37"
                    : "rgba(139, 111, 71, 0.3)"
                }`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
              }}
            >
              Back
            </button>

            <button
              onClick={() => setStep(0)}
              onMouseEnter={() => setHoveredButton("home")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                flex: 1,
                minWidth: "140px",
                padding: "16px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#8B6F47",
                background:
                  hoveredButton === "home"
                    ? "rgba(212, 175, 55, 0.1)"
                    : "transparent",
                border: `2px solid ${
                  hoveredButton === "home"
                    ? "#D4AF37"
                    : "rgba(139, 111, 71, 0.3)"
                }`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Floating ChatBot */}
      <ChatBot
  setRoom={setRoom}
  setStyle={setStyle}
  setPalette={setPalette}
  setModifierPrompt={setModifierPrompt}
  handleGenerate={handleGenerate}
/>


    </>
  );
}