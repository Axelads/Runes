import React, {useEffect} from "react";
import Header from "../components/Layout/Header";
import Intro from "../components/Main/Intro";
import BullesMedia from "../components/Main/BullesMedia";
import ButtonSection from "../components/Main/ButtonsSection";
import ResumeAbout from "../components/ResumeAbout/ResumeAbout";
import DernieresActus from "../components/Main/Actu/DernieresActus";
import Agenda from "../components/Agenda/Agenda";
import Separator from "../components/Design/Separator";
import Footer from "../components/Layout/Footer";


const Home = () => {
  // ✅ Force le scroll en haut après un court délai pour contrer la restauration automatique du navigateur
  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Désactive la restauration automatique
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Intro />
        <BullesMedia />
        <ButtonSection />
        <Separator />
        <ResumeAbout />
        <Separator />
        <DernieresActus />
        <Separator />
        <Agenda />
      </main>
      <Footer />

      
    </>
  );
};

export default Home;
