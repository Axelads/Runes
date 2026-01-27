import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const MembershipBanner = () => {
  const bannerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "footer",
      start: "top bottom",
      onEnter: () => setIsFixed(false),
      onLeaveBack: () => setIsFixed(true),
    });
  }, []);

  return (
    <>
      <div className={`membership-banner ${isFixed ? "active" : "hidden"}`} ref={bannerRef}>
        {isFixed ? (
          <div className="banner-content">
            <p>Rejoignez l'aventure ! Adhérez à l'association dès maintenant.</p>
            <div className="banner-actions">
              <img
                src="/qr_adhesion_2026.png"
                alt="QR Code pour adhérer à l'association RUNE 2026"
                className="banner-qr-code"
                width="60"
                height="60"
                loading="lazy"
              />
              <Link to="https://www.helloasso.com/associations/rune/adhesions/cotisation-2026" target="_blank" rel="noopener noreferrer" className="banner-button">
                Adhérez maintenant
              </Link>
              <button
                className="banner-qr-toggle"
                onClick={() => setShowPopup(true)}
                aria-label="Voir le QR code"
              >
                QR Code
              </button>
            </div>
          </div>
        ) : (
          <Link to="https://www.helloasso.com/associations/rune/adhesions/cotisation-2026" target="_blank" rel="noopener noreferrer" className="floating-button">
            Adhérez maintenant
          </Link>
        )}
      </div>

      {showPopup && (
        <div className="qr-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="qr-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="qr-popup-close"
              onClick={() => setShowPopup(false)}
              aria-label="Fermer"
            >
              ✕
            </button>
            <h3>Adhérez à l'association</h3>
            <img
              src="/qr_adhesion_2026.png"
              alt="QR Code pour adhérer à l'association RUNE 2026"
              width="200"
              height="200"
            />
            <a
              href="https://www.helloasso.com/associations/rune/adhesions/cotisation-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="qr-popup-link"
            >
              Adhérer sur HelloAsso
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipBanner;
