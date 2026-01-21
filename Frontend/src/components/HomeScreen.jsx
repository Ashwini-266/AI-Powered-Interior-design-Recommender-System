import React, { useState, useEffect } from "react";

const images = [
  { src: "/images/bohemian.jpeg", alt: "Bohemian" },
  { src: "/images/diningroom.jpeg", alt: "Dining Room" },
  { src: "/images/garden.jpeg", alt: "Garden" },
  { src: "/images/kidsroom.jpeg", alt: "Kids Room" },
  { src: "/images/kitchen.jpeg", alt: "Kitchen" },
];

const features = [
  {
    icon: "🎨",
    title: "Creative Design",
    description: "Transform your space with our innovative interior design solutions tailored to your unique style."
  },
  {
    icon: "🏡",
    title: "Expert Planning",
    description: "Professional designers work with you to create functional and beautiful living spaces."
  },
  {
    icon: "✨",
    title: "Premium Quality",
    description: "We use only the finest materials and finishes to bring your vision to life."
  },
  {
    icon: "💎",
    title: "Luxury Experience",
    description: "Experience world-class service and attention to detail in every project we undertake."
  }
];

export default function HomeScreen({ isLoggedIn, setStep }) {
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
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Carousel Section */}
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

          {/* Content Overlay */}
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

            {/* Explore Button */}
            <button
              onClick={() => setStep(5)}
              disabled={!isLoggedIn}
              style={{
                padding: "14px 40px",
                fontSize: "15px",
                fontWeight: "600",
                color: isLoggedIn ? "#FFFDF7" : "rgba(255, 253, 247, 0.5)",
                background: isLoggedIn
                  ? "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)"
                  : "rgba(101, 37, 37, 0.3)",
                border: "none",
                borderRadius: "12px",
                cursor: isLoggedIn ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow: isLoggedIn
                  ? "0 8px 24px rgba(212, 175, 55, 0.4)"
                  : "none",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
              onMouseEnter={(e) => {
                if (isLoggedIn) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (isLoggedIn) {
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {isLoggedIn ? "Explore" : "Login Required"}
            </button>

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

      {/* About Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "80px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#D4AF37",
            margin: "0 auto 24px",
            borderRadius: "2px",
          }}
        />
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "600",
            color: "#652525",
            marginBottom: "16px",
            letterSpacing: "1px",
          }}
        >
          Transform Your Space
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "800px",
            margin: "0 auto 60px",
            lineHeight: "1.8",
          }}
        >
          Discover the art of living beautifully. Our expert designers bring your vision to life with personalized interior design solutions that reflect your unique style and personality.
        </p>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "40px 32px",
                background: "#FFFDF7",
                borderRadius: "16px",
                border: "2px solid rgba(212, 175, 55, 0.2)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 16px rgba(101, 37, 37, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(212, 175, 55, 0.2)";
                e.currentTarget.style.borderColor = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(101, 37, 37, 0.08)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#652525",
                  marginBottom: "12px",
                  letterSpacing: "0.5px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #652525 0%, #8B3333 100%)",
          padding: "80px 20px",
          marginTop: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "600",
              color: "#FFFDF7",
              marginBottom: "20px",
              letterSpacing: "1px",
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 253, 247, 0.9)",
              marginBottom: "40px",
              lineHeight: "1.7",
            }}
          >
            Join us today and begin your journey to creating the perfect space that reflects your style and personality.
          </p>
          {!isLoggedIn && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 32px",
                background: "rgba(212, 175, 55, 0.15)",
                borderRadius: "12px",
                border: "2px solid #D4AF37",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span
                style={{
                  fontSize: "16px",
                  color: "#D4AF37",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Please login to explore our design services
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}