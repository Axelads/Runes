import React, { useEffect, useRef } from "react";
import { useArticles } from "../components/hooks/useArticles";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import BackToHome from "../components/Button/BackToHome";
import pieceViolet from "../assets/image_piece/piece_violet.webp"

// ✅ Fonction pour extraire et supprimer la première image du contenu HTML
const extractImageFromContent = (htmlContent) => {
  const imgRegex = /<figure[^>]*class="wp-block-image"[^>]*>.*?<img[^>]+src="([^">]+)"[^>]*>.*?<\/figure>/i;
  const match = imgRegex.exec(htmlContent);

  if (match) {
    const updatedContent = htmlContent.replace(match[0], ""); // Supprime l'image du contenu
    return { imageUrl: match[1], cleanedContent: updatedContent };
  }

  return { imageUrl: null, cleanedContent: htmlContent };
};

// ✅ Fonction pour formater la date en "DD/MM/YYYY"
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const News = () => {
  const { articles, loading, error } = useArticles();
  const location = useLocation(); // Permet de récupérer l'URL avec l’ancre
  const articlesRef = useRef([]); // ✅ Références pour chaque article

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300); // Délai pour s'assurer que les articles sont bien chargés
      }
    }
  }, [location, articles]); // Re-scroll si la page change ou si les articles se chargent

  // ✅ Animation d'apparition avec une pulsation
  useEffect(() => {
    if (articlesRef.current.length > 0) {
      gsap.fromTo(
        articlesRef.current,
        { opacity: 0, scale: -0.1 }, // Départ légèrement plus petit
        {
          opacity: 1,
          scale: 1, // Légère surélévation
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2, // Décalage entre chaque article
        }
      );
    }
  }, [articles]);

  return (
    <div>
      <BackToHome />
      <div className="container-article">
        <div className="event-title">
                  <img src={pieceViolet} alt="Décoration gauche" className="title-icon left" />
                  <h1>Actualité</h1>
                  <img src={pieceViolet} alt="Décoration droite" className="title-icon right" />
                </div>
        {loading && <p>Chargement des articles...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {articles.map((article, index) => {
          // Extraction de l’image et du texte sans l’image
          const { imageUrl, cleanedContent } = extractImageFromContent(article.content.rendered);

          return (
            <article
              key={article.id}
              id={`article-${article.id}`}
              className="article"
              ref={(el) => (articlesRef.current[index] = el)} // ✅ Ajout d'une ref pour GSAP
            >
              {/* ✅ Titre de l'article */}
              <h2 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
              <div className="article-wrapper">
                {/* Affichage de l'image déplacée en dehors du texte */}
                {imageUrl && (
                  <figure className="wp-block-image">
                    <img src={imageUrl} alt={article.title.rendered} />
                  </figure>
                )}

                {/* Contenu de l'article SANS l’image */}
                <div className="container-paragraphe">
                  <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
                </div>
              </div>
              {/* ✅ Ajout de la date en dessous du titre */}
              <div className="date-article">
                🗓 Publié le {formatDate(article.date)}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default News;
