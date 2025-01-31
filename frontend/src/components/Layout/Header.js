import React, { useState } from "react";
import { Link } from "react-router-dom";
import TypoElfique from "../../assets/img_Design/ecriture_elfique.webp";
import TypoElfique2 from "../../assets/img_Design/ecriture_elfique.webp"; 
import ContactModal from "../modal/ContactModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ État pour gérer la modale

  return (
    <header className="header">
      <div className="header-content">
        <div className="ecriture-elfique">
          <img src={TypoElfique} alt="Écriture de fond elfique" className="ecriture elfique" />
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/events">Événements</Link></li>
            <li>
              {/* ✅ Remplacement de "Nous joindre" par un bouton qui ouvre la modale */}
              <button className="contact-btn" onClick={() => setIsModalOpen(true)}>
                Nous joindre
              </button>
            </li>
            <li><Link to="/news">Actualité</Link></li>
          </ul>
        </nav>

        <div className="ecriture-elfique">
          <img src={TypoElfique2} alt="Écriture de fond elfique" className="ecriture elfique" />
        </div>
      </div>

      {/* ✅ Affichage de la modale si `isModalOpen` est `true` */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
