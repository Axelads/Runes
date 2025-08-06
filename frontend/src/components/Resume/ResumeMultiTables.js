import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import tableJDR from "../../assets/logo_assoc/logo_multi_tables.webp"; // Ajoute une image représentative

gsap.registerPlugin(ScrollTrigger);

const MultiTables = () => {
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
    <section className="multi-tables" ref={sectionRef}>
      <h2>Les Journées Multi-Tables de <span className="highlight">R.U.N.E</span></h2>
      
      <div className="content-wrapper">
        <img src={tableJDR} alt="Journée multi-tables de l'association JDR RUNE" className="multi-tables-img" />
        <p>
          Chaque mois, <strong>l'<span className="highlight">association JDR</span> <span className="highlight">RUNE</span></strong> organise une grande <strong>journée Multi-Tables</strong> à <strong>La Valette-du-Var</strong>.  
          Dès <strong>11h</strong>, nous nous retrouvons dans une salle dédiée au jeu de rôle pour installer les tables et partager un moment convivial autour d’un repas.  
          En moyenne, <strong>25 à 35 passionnés</strong> de JDR assistent à ces journées.

          Après le repas, chaque joueur choisit son univers parmi les <strong>5 à 8 scénarios One Shot</strong> proposés par nos maîtres de jeu.  
          Certains éditeurs viennent même présenter leurs créations et univers JDR !

          Ces journées permettent aux **novices** de découvrir le <strong>jeu de rôle</strong> dans un cadre bienveillant et aux **initiés** de se retrouver en physique au moins une fois par mois.  
          C’est ce qui fait la force de <span className="highlight">l'association RUNE</span> : <strong>regrouper ses membres</strong> et partager ensemble la passion du JDR dans la région <span className="highlight">La Valette-du-Var</span>.
        </p>
      </div>

      <Link to="/events" className="btn-events">Voir les prochaines dates des Multi-Tables</Link>
    </section>
  );
};

export default MultiTables;
