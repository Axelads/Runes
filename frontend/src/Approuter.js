import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import News from "./pages/News";
import PageTransition from "./components/PageTransition";

const AppRouter = () => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
      </Routes>
    </>
  );
};

export default AppRouter;
