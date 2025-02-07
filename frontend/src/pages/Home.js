import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Intro from "../components/Main/Intro";
import BullesMedia from "../components/Main/BullesMedia";
import ButtonSection from "../components/Main/ButtonsSection";
import ResumeAbout from "../components/ResumeAbout/ResumeAbout";
import DernieresActus from "../components/Main/Actu/DernieresActus";
import Agenda from "../components/Agenda/Agenda";
import Separator from "../components/Design/Separator";


const Home = () => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
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

      
    </>
  );
};

export default Home;
