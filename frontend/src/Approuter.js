import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import BackToTop from "../src/components/Button/BackToTop";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import ContactModal from "./components/modal/ContactModal"; // ✅ Import de la modale

const AppRouter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Centralisation de l'état

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      
      <Routes>
        <Route path="/" element={<PageTransition><Home setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} /></PageTransition>} />
        {/* Redirection vers WordPress pour /shop */}
        <Route path="/shop" element={<a href="https://rolistesunis.fr/shop">Accéder à la boutique</a>} />

        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/politique-de-confidentialite" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>

      <BackToTop />
      <Footer setIsModalOpen={setIsModalOpen} />
      
      {/* ✅ La modale est ici pour être accessible à tous */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AppRouter;
