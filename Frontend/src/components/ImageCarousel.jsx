import React, { useEffect, useState } from "react";

const images = [
  { src: "/images/bohemian.jpeg", alt: "Bohemian" },
  { src: "/images/diningroom.jpeg", alt: "Dining Room" },
  { src: "/images/garden.jpeg", alt: "Garden" },
  { src: "/images/kidsroom.jpeg", alt: "Kids Room" },
  { src: "/images/kitchen.jpeg", alt: "Kitchen" },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    if (index !== current) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "60px auto",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(101, 37, 37, 0.15)",
          border: "3px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        {/* Main Image */}
        <img
          src={images[current].src}
          alt={images[current].alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTransitioning ? 0.6 : 1,
            transform: isTransitioning ? "scale(1.05)" : "scale(1)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(101, 37, 37, 0.1) 0%, rgba(101, 37, 37, 0.4) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Title Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "32px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "32px",
              fontWeight: "600",
              color: "#FFFDF7",
              letterSpacing: "1px",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            {images[current].alt}
          </h3>

          {/* Indicator Dots */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: current === index ? "40px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  background:
                    current === index
                      ? "#D4AF37"
                      : "rgba(255, 253, 247, 0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    current === index
                      ? "0 2px 8px rgba(212, 175, 55, 0.5)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (current !== index) {
                    e.currentTarget.style.background =
                      "rgba(255, 253, 247, 0.7)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (current !== index) {
                    e.currentTarget.style.background =
                      "rgba(255, 253, 247, 0.4)";
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            goToSlide(current === 0 ? images.length - 1 : current - 1)
          }
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255, 253, 247, 0.9)",
            border: "2px solid rgba(212, 175, 55, 0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#D4AF37";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 253, 247, 0.9)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#652525"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => goToSlide((current + 1) % images.length)}
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255, 253, 247, 0.9)",
            border: "2px solid rgba(212, 175, 55, 0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#D4AF37";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 253, 247, 0.9)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#652525"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "120px",
              height: "80px",
              borderRadius: "12px",
              overflow: "hidden",
              border:
                current === index
                  ? "3px solid #D4AF37"
                  : "2px solid rgba(101, 37, 37, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                current === index
                  ? "0 4px 16px rgba(212, 175, 55, 0.4)"
                  : "0 2px 8px rgba(101, 37, 37, 0.1)",
              transform: current === index ? "scale(1.05)" : "scale(1)",
              opacity: current === index ? 1 : 0.6,
              padding: 0,
              background: "none",
            }}
            onMouseEnter={(e) => {
              if (current !== index) {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (current !== index) {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}