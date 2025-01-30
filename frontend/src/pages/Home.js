import React from "react";
import Header from "../components/Layout/Header";
import Intro from "../components/Main/Intro";
import BullesMedia from "../components/Main/BullesMedia";
import ButtonSection from "../components/Main/ButtonsSection";
import DernieresActus from "../components/Main/Actu/DernieresActus";


const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <BullesMedia />
        <ButtonSection />
        <DernieresActus />
      </main>
      
    </>
  );
};

export default Home;
