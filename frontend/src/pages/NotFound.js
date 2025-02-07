import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Layout/Footer";

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <h1>404</h1>
        <p>Oups ! La page que vous cherchez n'existe pas.</p>
        <Link to="/" className="home-link">Retour à l'accueil</Link>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
