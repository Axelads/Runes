import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Importation des images des pièces
import aboutIcon from "../../assets/image_piece/piece_bleu.webp";
import eventsIcon from "../../assets/image_piece/piece_verte.webp";
import newsIcon from "../../assets/image_piece/piece_violet.webp";
import contactIcon from "../../assets/image_piece/piece_rouge.webp";

// Enregistre le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ButtonsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ✅ Animation d'apparition progressive lors du scroll
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 98%", // Se déclenche quand 20% est visible
          toggleActions: "play none none none",
        },
      }
    );

    // ✅ Animation de rotation des pièces au hover
    gsap.utils.toArray(".piece-container").forEach((piece) => {
      gsap.set(piece, { transformStyle: "preserve-3d" });

      piece.addEventListener("mouseenter", () => {
        gsap.to(piece, {
          rotationY: 180, // Tourne uniquement l'image
          duration: 0.6,
          ease: "power2.out",
        });
      });

      piece.addEventListener("mouseleave", () => {
        gsap.to(piece, {
          rotationY: 0, // Retour à l'état initial
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    });
  }, []);

  return (
    <section className="buttons-section" ref={sectionRef}>
      <div className="button-container">
        <div className="piece-container">
          <img src={aboutIcon} alt="À propos" className="piece" />
        </div>
        <h2>À propos</h2>
      </div>
      <div className="button-container">
        <div className="piece-container">
          <img src={eventsIcon} alt="Événements" className="piece" />
        </div>
        <h2>Événements</h2>
      </div>
      <div className="button-container">
        <div className="piece-container">
          <img src={newsIcon} alt="Actualité" className="piece" />
        </div>
        <h2>Actualité</h2>
      </div>
      <div className="button-container">
        <div className="piece-container">
          <img src={contactIcon} alt="Nous contacter" className="piece" />
        </div>
        <h2>Nous contacter</h2>
      </div>
    </section>
  );
};

export default ButtonsSection;
