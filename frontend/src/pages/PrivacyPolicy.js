import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Politique de Confidentialité</h1>
      <p>
        Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site.
      </p>
      
      <h2>📌 Collecte des données</h2>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience utilisateur, analyser le trafic du site et afficher des contenus pertinents.
      </p>
      
      <h2>📌 Utilisation des cookies</h2>
      <p>
        Les cookies sont des fichiers stockés sur votre appareil pour analyser l’utilisation du site et améliorer nos services.
      </p>

      <h2>📌 Gestion des cookies</h2>
      <p>
        Vous pouvez accepter ou refuser les cookies via notre bandeau de consentement.
      </p>

      <h2>📌 Contact</h2>
      <p>
        Pour toute question sur la protection des données, contactez-nous à <a href="mailto:assorune@gmail.com">assorune@gmail.com</a>.
      </p>

      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default PrivacyPolicy;
