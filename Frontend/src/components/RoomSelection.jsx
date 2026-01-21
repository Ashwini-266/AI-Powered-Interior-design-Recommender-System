import React, { useState } from "react";

export default function RoomSelection({
  selectedRoom,
  setSelectedRoom,
  setRoom,
  setStep,
}) {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const roomOptions = [
    { label: "Living Room", image: "/images/livingroom.jpeg" },
    { label: "Bedroom", image: "/images/bedroom.jpg" },
    { label: "Kitchen", image: "/images/kitchen.jpeg" },
    { label: "Bathroom", image: "/images/bathroom.jpeg" },
    { label: "Dining Room", image: "/images/diningroom.jpeg" },
    { label: "Office", image: "/images/office.jpeg" },
    { label: "Kids Room", image: "/images/kidsroom.jpeg" },
    { label: "Guest Room", image: "/images/guestroom.jpg" },
    { label: "Balcony", image: "/images/balcony.jpg" },
    { label: "Home Theater", image: "/images/homeTeatre.jpeg" },
    { label: "Study Room", image: "/images/studyRoom.jpeg" },
    { label: "Laundry Room", image: "/images/loundryRoom.jpeg" },
  ];

  const handleNext = () => {
    setRoom(selectedRoom);
    setStep(2);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px 80px",
        background: "linear-gradient(135deg, #FFFDF7 0%, #FFF8E7 100%)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
              fontSize: "32px",
              fontWeight: "600",
              color: "#652525",
              letterSpacing: "-0.5px",
            }}
          >
            Select Your Room
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#8B6F47",
              fontWeight: "400",
            }}
          >
            Choose the space you'd like to transform
          </p>
        </div>

        {/* Room Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {roomOptions.map((option, index) => {
            const isSelected = selectedRoom === option.label;
            const isHovered = hoveredRoom === index;

            return (
              <div
                key={option.label}
                onClick={() => setSelectedRoom(option.label)}
                onMouseEnter={() => setHoveredRoom(index)}
                onMouseLeave={() => setHoveredRoom(null)}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: isSelected
                    ? "3px solid #D4AF37"
                    : "2px solid rgba(101, 37, 37, 0.1)",
                  boxShadow: isSelected
                    ? "0 12px 32px rgba(212, 175, 55, 0.3)"
                    : isHovered
                    ? "0 8px 24px rgba(101, 37, 37, 0.15)"
                    : "0 4px 12px rgba(101, 37, 37, 0.08)",
                  transform:
                    isSelected || isHovered
                      ? "translateY(-4px)"
                      : "translateY(0)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: "#fff",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "160px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter:
                        isSelected || isHovered
                          ? "brightness(0.85)"
                          : "brightness(0.95)",
                      transform:
                        isHovered && !isSelected
                          ? "scale(1.05)"
                          : "scale(1)",
                      transition: "all 0.4s ease",
                    }}
                  />
                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isSelected
                        ? "linear-gradient(180deg, rgba(212, 175, 55, 0.2) 0%, rgba(101, 37, 37, 0.3) 100%)"
                        : isHovered
                        ? "linear-gradient(180deg, rgba(101, 37, 37, 0.1) 0%, rgba(101, 37, 37, 0.2) 100%)"
                        : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                {/* Label */}
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    background: isSelected
                      ? "rgba(212, 175, 55, 0.08)"
                      : "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: isSelected ? "600" : "500",
                      color: isSelected ? "#652525" : "#5A3A3A",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {option.label}
                  </h3>
                </div>

                {/* Selected Checkmark */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "32px",
                      height: "32px",
                      background: "#D4AF37",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(212, 175, 55, 0.4)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFDF7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleNext}
            disabled={!selectedRoom}
            style={{
              padding: "16px 48px",
              fontSize: "16px",
              fontWeight: "600",
              color: selectedRoom ? "#FFFDF7" : "rgba(255, 253, 247, 0.5)",
              background: selectedRoom
                ? "linear-gradient(135deg, #652525 0%, #8B3333 100%)"
                : "rgba(101, 37, 37, 0.3)",
              border: "none",
              borderRadius: "12px",
              cursor: selectedRoom ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: selectedRoom
                ? "0 6px 20px rgba(101, 37, 37, 0.25)"
                : "none",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              if (selectedRoom) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(101, 37, 37, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedRoom) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(101, 37, 37, 0.25)";
              }
            }}
          >
            Continue
          </button>

          <button
            onClick={() => setStep(0)}
            style={{
              padding: "16px 48px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#8B6F47",
              background: "transparent",
              border: "2px solid rgba(139, 111, 71, 0.3)",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)";
              e.currentTarget.style.borderColor = "#D4AF37";
              e.currentTarget.style.color = "#652525";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(139, 111, 71, 0.3)";
              e.currentTarget.style.color = "#8B6F47";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}