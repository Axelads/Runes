import React, { useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { FaArrowUp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const buttonRef = React.useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "footer",
      start: "top 85%", // ✅ Déclenche quand 15% du footer est visible
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
  }, []);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        buttonRef.current,
        { y: 0 },
        {
          y: -10, // ✅ Fait "sauter" le bouton de 10px
          duration: 0.6,
          ease: "power1.inOut",
          yoyo: true, // ✅ Revient à la position initiale
          repeat: -1, // ✅ Animation infinie
        }
      );
    } else {
      gsap.to(buttonRef.current, { y: 0, clearProps: "all" }); // ✅ Réinitialise quand invisible
    }
  }, [visible]);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: true }, duration: 1, ease: "power2.out" });
  };

  return (
    <button
      ref={buttonRef}
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Revenir en haut"
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
