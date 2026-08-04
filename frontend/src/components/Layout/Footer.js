import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoRune from "../../assets/logo_assoc/logo-long.webp";
import sloganRune from "../../assets/slogan/Slogan_Rune.webp";

// ✅ Import optimisé des icônes
import { FaDiscord, FaInstagram, FaFacebookF, FaEnvelope, FaGlobe, FaCopyright, FaForumbee } from "react-icons/fa6";

import ContactModal from "../modal/ContactModal"; // ✅ Import de la modale
import AxelLogo from "./AxelLogo"; // ✅ Logo Axel Grégoire avec bulles tournantes

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Gestion de la modale

  return (
    <footer className="footer">
      <section className="contain-infos">

        {/* 🟢 Section Présentation */}
        <div className="footer-section about">
          <img src={logoRune} alt="Logo de l'association RUNE" className="footer-logo" />
          <p>
            <strong>RUNE</strong>, une association loi 1901 dédiée au jeu de rôle depuis 1998 à Toulon et sa région.
            Retrouvez-nous pour des parties passionnantes et notre événement annuel{" "}
            <a href="https://jeuxderune.com/" target="_blank" rel="noopener noreferrer">
              Jeux de Rune
            </a>{" "}
            !
          </p>
        </div>

        <div className="footer-bottom">
          {/* 🟢 Section Navigation rapide */}
          <div className="footer-section navigation">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/events">Événements</Link></li>
              <li><Link to="/news">Actualités</Link></li>
              {/* ✅ Bouton pour ouvrir la modale Contact */}
              <li>
                <button className="contact-btn" onClick={() => setIsModalOpen(true)}>
                  Nous contacter
                </button>
              </li>
            </ul>
          </div>

          {/* 🟢 Section Contact et Réseaux sociaux */}
          <div className="footer-section contact">
            <h3>Contact</h3>
            <p>
              <FaEnvelope /> <a href="mailto:assorune@gmail.com">assorune@gmail.com</a>
            </p>
            <p>
              <FaGlobe /> <a href="https://jeuxderune.com/" target="_blank" rel="noopener noreferrer">
                Site Convention
              </a>
            </p>

            <div className="social-links">
              <a href="https://discord.gg/BVpRCCFSkX" target="_blank" rel="noopener noreferrer" aria-label="Rejoindre notre Discord">
                <FaDiscord />
              </a>
              <a href="https://www.instagram.com/jeux_de_rune/" target="_blank" rel="noopener noreferrer" aria-label="Voir notre Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61564211517638" target="_blank" rel="noopener noreferrer" aria-label="Voir notre Facebook">
                <FaFacebookF />
              </a>
              <a href="https://rolistesunis.forumactif.org/" target="_blank" rel="noopener noreferrer" aria-label="Rejoindre notre Forum">
                <FaForumbee />
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Ajout du slogan */}
        <div className="slogan-container">
          <img src={sloganRune} alt="Slogan de l'association RUNE" />
        </div>
      </section>

      {/* 🟢 Section Copyright */}
      <div className="footer-copyright">
        <a
          href="https://axelgregoire.fr/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site d'Axel Grégoire"
          className="axel-logo-link"
        >
          <AxelLogo size={70} smallDotSize={3} bigDotSize={5} invertLogo />
        </a>
        <p>
          <FaCopyright /> 2025 - Fait par{" "}
          <a href="https://axelgregoire.fr/" target="_blank" rel="noopener noreferrer">
            Axel Grégoire
          </a>
        </p>
      </div>

      {/* ✅ Ajout de la modale ContactModal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;
