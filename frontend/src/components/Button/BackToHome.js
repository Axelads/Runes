import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { CornerUpLeft } from "lucide-react";

const BackToHome = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true); // ✅ Active le bouton dans le DOM

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, x: -50 }, // ✅ Départ caché et décalé à gauche
        {
          opacity: 1,
          x: 0, // ✅ Arrive à sa position normale
          duration: 1.2,
          ease: "power2.out",
        }
      );
    }, 2000); // ✅ Démarre après 2 secondes

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      ref={buttonRef}
      className={`back-to-home ${!isVisible ? "hidden" : ""}`} // ✅ Ajout de la classe hidden pour cacher avant GSAP
      onClick={handleClick}
    >
      <CornerUpLeft size={32} />
    </button>
  );
};

export default BackToHome;
