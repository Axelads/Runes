import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ContactModal from "../modal/ContactModal"; // ✅ Modale importée

// Importation des images des pièces
import aboutIcon from "../../assets/image_piece/piece_bleu.webp";
import eventsIcon from "../../assets/image_piece/piece_verte.webp";
import newsIcon from "../../assets/image_piece/piece_violet.webp";
import contactIcon from "../../assets/image_piece/piece_rouge.webp";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ButtonsSection = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Gestion de la modale

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
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <>
      <section className="buttons-section" ref={sectionRef}>
        {/* ✅ À PROPOS */}
        <Link to="/about" className="button-container" aria-label="Aller à la page À propos">
          <div className="piece-container">
            <img src={aboutIcon} alt="À propos" className="piece" />
          </div>
          <h2>À propos</h2>
        </Link>

        {/* ✅ ÉVÉNEMENTS */}
        <Link to="/events" className="button-container" aria-label="Aller à la page Événements">
          <div className="piece-container">
            <img src={eventsIcon} alt="Événements" className="piece" />
          </div>
          <h2>Événements</h2>
        </Link>

        {/* ✅ ACTUALITÉ (Ouvre la page News.js) */}
        <Link to="/news" className="button-container" aria-label="Aller à la page Actualités">
          <div className="piece-container">
            <img src={newsIcon} alt="Actualité" className="piece" />
          </div>
          <h2>Actualité</h2>
        </Link>

        {/* ✅ NOUS CONTACTER (Ouvre la modale) */}
        <div
          className="button-container"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
          aria-label="Ouvrir la modale de contact"
        >
          <div className="piece-container">
            <img src={contactIcon} alt="Nous contacter" className="piece" />
          </div>
          <h2>Nous contacter</h2>
        </div>
      </section>

      {/* ✅ Affichage de la modale */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ButtonsSection;
