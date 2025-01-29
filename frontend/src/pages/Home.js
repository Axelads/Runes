import React from "react";
import Header from "../components/Layout/Header";
import Intro from "../components/Main/Intro";
import BullesMedia from "../components/Main/BullesMedia";


const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <BullesMedia />
      </main>
      
    </>
  );
};

export default Home;
