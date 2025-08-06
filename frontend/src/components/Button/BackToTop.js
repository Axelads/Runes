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
      start: "top 99%", // ✅ S'affiche quand on atteint presque le footer
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
          y: -10, // ✅ Effet de "rebond"
          duration: 0.6,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    } else {
      gsap.to(buttonRef.current, { y: 0, clearProps: "all" });
    }
  }, [visible]);

  const scrollToTop = () => {
    console.log("🔝 ScrollToTop déclenché !");

    const isMobile = window.innerWidth <= 768; // ✅ Détecte si on est sur mobile

    gsap.to(window, {
      scrollTo: { y: "body", autoKill: false },
      duration: isMobile ? 1.3 : 0.1, // ✅ Plus rapide sur Desktop
      ease: "power2.out",
      onComplete: () => {
        console.log("✅ Scroll terminé !");
        document.documentElement.scrollTop = 0;
      },
    });
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
