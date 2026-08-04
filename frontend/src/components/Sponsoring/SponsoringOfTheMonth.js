import React, { useState } from "react";
import ContactModal from "../modal/ContactModal";

const SponsoringOfTheMonth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sponsoring-of-the-month">
      <h2>⭐ Sponsoring du Mois</h2>

      {/* 🧵 Atelier des Griffons */}
      <div className="sponsoring-content">
        <img
          src="https://www.image-heberg.fr/files/1754459677724502362.jpg"
          alt="Atelier des Griffons"
          className="sponsoring-image"
        />
        <p><strong>🧵 Ce mois-ci, découvrez :</strong></p>
        <h3>Atelier des Griffons</h3>
        <p>
          Des créations artisanales inspirées par l’univers du jeu de rôle, des
          objets faits main qui raviront les joueurs passionnés comme les
          collectionneurs exigeants.
        </p>
        <p>
          De magnifiques sacs à dés, grimoires, carnets personnalisés, et
          accessoires de JDR confectionnés avec soin, pour donner vie à vos
          parties !
        </p>

        <div className="sponsoring-links">
          <a
            href="https://www.etsy.com/shop/atelierdesgriffons#items"
            target="_blank"
            rel="noopener noreferrer"
          >
            🛍️ Voir la boutique Etsy
          </a>
        </div>
      </div>

      {/* 📚 Bragelonne */}
      <div className="sponsoring-content">
        <img
          src="https://www.loumina.fr/design/maisons-d-edition/bragelonne.png"
          alt="Bragelonne"
          className="sponsoring-image"
        />
        <p><strong>📚 Éditeur mis en lumière :</strong></p>
        <h3>Bragelonne</h3>
        <p>
          Maison d’édition emblématique de la fantasy, science-fiction et
          fantastique en France, Bragelonne publie des œuvres marquantes et
          passionnantes depuis plus de 20 ans.
        </p>
        <p>
          Retrouvez des univers riches, des auteurs renommés, et des ouvrages
          devenus cultes pour les amateurs d’imaginaire.
        </p>

        <div className="sponsoring-links">
          <a
            href="https://www.bragelonne.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 Visiter le site officiel
          </a>
        </div>
      </div>

      <p>📣 Vous souhaitez sponsoriser votre projet ?</p>
      <button onClick={handleOpenModal}>Nous contacter</button>

      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SponsoringOfTheMonth;
