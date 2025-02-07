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
      start: "top 99%", // ✅ Déclenche quand 15% du footer est visible
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
          y: -10, // ✅ Animation sautillante
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

    gsap.to(window, {
      scrollTo: { y: "body", autoKill: false }, // ✅ Assure un scroll complet
      duration: 1.3,
      ease: "power2.out",
      onComplete: () => {
        // ✅ Fallback pour Safari / certains navigateurs mobiles
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
