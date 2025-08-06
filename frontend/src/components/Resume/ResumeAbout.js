import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import logoRune from "../../assets/logo_assoc/logo-long.webp"; 

gsap.registerPlugin(ScrollTrigger);

const ResumeAbout = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
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
    }
  }, []);

  return (
    <section className="resume-about" ref={sectionRef}>
      <h2>Résumé de l'association R.U.N.E</h2>
      
      {/* ✅ Nouveau conteneur pour aligner le logo et le texte */}
      <div className="content-wrapper">
        <img src={logoRune} alt="Logo de l'association Rune" className="logo-rune" />
        <p>
          <strong>RUNE</strong> (Rolistes Unis, Sous un nouvel Emblème), est une association loi 1901 fondée en 1998, dédiée à la promotion du jeu de rôle à Toulon et dans sa région.
          Depuis plus de <strong>25 ans</strong>, nous rassemblons aussi bien les rôlistes aguerris que les novices autour de tables captivantes.
          Chaque année, nous organisons une convention incontournable pour célébrer l’univers du jeu de rôle :{" "}
          <strong>
            <a href="https://jeuxderune.com/" target="_blank" rel="noopener noreferrer">
              Jeux de Rune
            </a>
          </strong>.
          En 2024, nous avons fièrement célébré la <strong>9ᵉ édition</strong> de cet événement, offrant aux passionnés un défi onirique unique et palpitant.
        </p>
      </div>

      <Link to="/about" className="btn-about">En savoir plus</Link>
    </section>
  );
};

export default ResumeAbout;
