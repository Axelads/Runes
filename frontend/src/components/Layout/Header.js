import React from "react";
import { Link } from "react-router-dom";
import TypoElfique from "../../assets/img_Design/ecriture_elfique.webp"; // Import correct
import TypoElfique2 from "../../assets/img_Design/ecriture_elfique.webp"; // Si c'est la même image, sinon modifie le chemin

const Header = () => {
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
            <li><Link to="/contact">Nous joindre</Link></li>
            <li><Link to="/news">Actualité</Link></li>
          </ul>
        </nav>

        <div className="ecriture-elfique">
          <img src={TypoElfique2} alt="Écriture de fond elfique" className="ecriture elfique" />
        </div>
      </div>
    </header>
  );
};

export default Header;
