import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../hooks/useArticles";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import newsIcon from "../../../assets/image_piece/piece_violet.webp";
import Card from "../../Cards/CardActu";

gsap.registerPlugin(ScrollTrigger);

const extractImageFromContent = (htmlContent) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = imgRegex.exec(htmlContent);
  return match ? match[1] : null;
};

const DernieresActus = () => {
  const sectionRef = useRef(null);
  const { articles, loading, error } = useArticles();
  const navigate = useNavigate();

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

  const handleCardClick = (articleId) => {
    navigate(`/news#article-${articleId}`);
  };

  const hasArticles = articles && articles.length > 0;
  const sortedArticles = hasArticles ? [...articles].sort((a, b) => b.id - a.id) : [];
  const topThree = sortedArticles.slice(0, 3);

  return (
    <section className="dernieres-actus" ref={sectionRef}>
      <h2>Les dernières actualités de l'association</h2>
      <img src={newsIcon} alt="Événements" className="piece" />
      {loading && <p>Chargement des articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {hasArticles ? (
        <div className="cards-container">
          {topThree.map((article) => {
            let image = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            if (!image && article.content?.rendered) {
              image = extractImageFromContent(article.content.rendered);
            }

            const title = article.title.rendered;
            const excerpt = article.excerpt.rendered
              ? article.excerpt.rendered
              : article.content.rendered.replace(/<[^>]+>/g, "").substring(0, 100) + "...";

            return (
              <div key={article.id} onClick={() => handleCardClick(article.id)} style={{ cursor: "pointer" }}>
                <Card image={image} title={title} excerpt={excerpt} isEmpty={!image} />
              </div>
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
