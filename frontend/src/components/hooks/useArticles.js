// src/hooks/useArticles.js
import { useState, useEffect } from "react";

const CATEGORY_ID = 777937450; // ID de la catégorie "RolistesUnis"

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/festivaljeuxderune.wordpress.com/posts?categories=${CATEGORY_ID}&_embed`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles.");
        }
        const data = await response.json();
        // Tri des articles par date décroissante (les plus récents en premier)
        const sortedArticles = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setArticles(sortedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
