import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import BackToTop from "../src/components/Button/BackToTop"; // ✅ Import du bouton de retour en haut
import Footer from "./components/Layout/Footer";

const AppRouter = () => {
  return (
    <>
      
      <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
      <BackToTop />
      <Footer />

    </>
  );
};

export default AppRouter;
