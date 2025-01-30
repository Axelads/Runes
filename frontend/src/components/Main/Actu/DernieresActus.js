import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

// Enregistre ScrollTrigger pour GSAP
gsap.registerPlugin(ScrollTrigger);

const DernieresActus = ({ articles }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ✅ Animation d'apparition au scroll
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
          start: "top 80%", // Se déclenche lorsque 20% du composant est visible
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Vérifie si on a des articles ou non
  const hasArticles = articles && articles.length > 0;

  return (
    <section className="dernieres-actus" ref={sectionRef}>
      <h2>Les dernières actualités de l'association</h2>

      {hasArticles ? (
        <div className="cards-container">
          {articles.slice(0, 3).map((article, index) => (
            <Card 
              key={index} 
              image={article.image || null} 
              title={article.title || "Titre en attente"} 
              excerpt={article.excerpt || "Aucune actualité pour le moment."} 
              isEmpty={!article.image} // ✅ Indique si la carte est vide
            />
          ))}
        </div>
      ) : (
        <>
          <div className="en-attente">
            <p>🛠 En Attente - Aucune actualité pour le moment.</p>
          </div>
          <div className="cards-container">
            {[...Array(3)].map((_, index) => (
              <Card 
                key={index} 
                image={null} 
                title="Titre en attente" 
                excerpt="Aucune actualité pour le moment." 
                isEmpty={true} // ✅ Indique que ce sont des cartes vides
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default DernieresActus;
