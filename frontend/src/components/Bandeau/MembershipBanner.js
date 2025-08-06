import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const MembershipBanner = () => {
  const bannerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "footer", // Déclencheur = le footer
      start: "top bottom", // Quand le haut du footer touche le bas de la fenêtre
      onEnter: () => setIsFixed(false), // Cache le bandeau et affiche le bouton
      onLeaveBack: () => setIsFixed(true), // Remet le bandeau quand on remonte
    });
  }, []);

  return (
    <div className={`membership-banner ${isFixed ? "active" : "hidden"}`} ref={bannerRef}>
      {isFixed ? (
        <div className="banner-content">
          <p>Rejoignez l'aventure ! Adhérez à l'association dès maintenant.</p>
          <Link to="https://www.helloasso.com/associations/rune/adhesions/cotisation-rune-2025" target="_blank" rel="noopener noreferrer" className="banner-button">
            Adhérez maintenant
          </Link>
        </div>
      ) : (
        <Link to="https://www.helloasso.com/associations/rune/adhesions/cotisation-rune-2025" target="_blank" rel="noopener noreferrer" className="floating-button">
          Adhérez maintenant
        </Link>
      )}
    </div>
  );
};

export default MembershipBanner;
