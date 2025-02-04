// src/pages/News.js
import React from "react";
import { useArticles } from "../components/hooks/useArticles";
import Footer from "../components/Layout/Footer";

const News = () => {
  const { articles, loading, error } = useArticles();

  return (
    <div>
      <h1>Actualités</h1>
      {loading && <p>Chargement des articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {articles.map((article, index) => (
        <article
          key={article.id}
          id={`article-${index + 1}`} // IDs séquentiels : 1 pour le plus récent, etc.
        >
          <h2 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
          
          {/* Affichage de l'image mise en avant si disponible */}
          {article._embedded &&
            article._embedded["wp:featuredmedia"] &&
            article._embedded["wp:featuredmedia"][0] && (
              <img
                src={article._embedded["wp:featuredmedia"][0].source_url}
                alt={article.title.rendered}
              />
            )}

          {/* Affichage du contenu complet de l'article */}
          <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
        </article>
      ))}
      <Footer />
    </div>
  );
};

export default News;
