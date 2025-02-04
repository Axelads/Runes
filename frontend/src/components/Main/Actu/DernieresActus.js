// src/components/DernieresActus.js
import React, { useEffect, useRef } from "react";
import { useArticles } from "../../hooks/useArticles";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import newsIcon from "../../../assets/image_piece/piece_violet.webp";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

// Fonction utilitaire pour extraire l'URL d'une image depuis le HTML
const extractImageFromContent = (htmlContent) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = imgRegex.exec(htmlContent);
  return match ? match[1] : null;
};

const DernieresActus = () => {
  const sectionRef = useRef(null);
  const { articles, loading, error } = useArticles();

  useEffect(() => {
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
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Vérification de la présence d'articles
  const hasArticles = articles && articles.length > 0;
  // Tri par ID décroissant (le plus grand = le plus récent)
  const sortedArticles = hasArticles ? [...articles].sort((a, b) => b.id - a.id) : [];
  // Sélection des 3 premiers articles
  const topThree = sortedArticles.slice(0, 3);

  // Log pour déboguer les données des articles
  console.log("DernieresActus - topThree articles:", topThree);

  return (
    <section className="dernieres-actus" ref={sectionRef}>
      <h2>Les dernières actualités de l'association</h2>
      <img src={newsIcon} alt="Événements" className="piece" />
      {loading && <p>Chargement des articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {hasArticles ? (
        <div className="cards-container">
          {topThree.map((article, index) => {
            // Tenter de récupérer l'image mise en avant depuis _embedded
            let image =
              article._embedded &&
              article._embedded["wp:featuredmedia"] &&
              article._embedded["wp:featuredmedia"][0]
                ? article._embedded["wp:featuredmedia"][0].source_url
                : null;

            // Si l'image n'est pas présente dans _embedded, l'extraire depuis content.rendered
            if (!image && article.content && article.content.rendered) {
              image = extractImageFromContent(article.content.rendered);
            }

            // Pour déboguer, on affiche dans la console l'URL trouvée
            console.log(`Article ID ${article.id} - image:`, image);

            const title = article.title.rendered;
            const excerpt = article.excerpt.rendered
              ? article.excerpt.rendered
              : article.content.rendered.replace(/<[^>]+>/g, "").substring(0, 100) + "...";

            return (
              <a key={article.id} href={`/news#article-${index + 1}`}>
                <Card
                  image={image}
                  title={title}
                  excerpt={excerpt}
                  isEmpty={!image}
                />
              </a>
            );
          })}
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
                isEmpty={true}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default DernieresActus;
