import React, { useEffect } from "react";
import Intro from "../components/Main/Intro";
import BullesMedia from "../components/Main/BullesMedia";
import ButtonSection from "../components/Main/ButtonsSection";
import ResumeAbout from "../components/Resume/ResumeAbout";
import DernieresActus from "../components/Main/Actu/DernieresActus";
import Agenda from "../components/Agenda/Agenda";
import Separator from "../components/Design/Separator";
import MembershipBanner from "../components/Bandeau/MembershipBanner";
import MultiTables from "../components/Resume/ResumeMultiTables";
import SponsoringOfTheMonth from "../components/Sponsoring/SponsoringOfTheMonth";

const Home = ({ isModalOpen, setIsModalOpen }) => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, []);

  return (
    <>
      <main>
        <Intro />
        {!isModalOpen && <BullesMedia />} {/* ✅ Cache BullesMedia si modale ouverte */}
        <ButtonSection setIsModalOpen={setIsModalOpen} />
        <Separator />
        <ResumeAbout />
        <Separator />
        <DernieresActus />
        <Separator />
        <MultiTables />
        <Separator />
        <Agenda />
        <SponsoringOfTheMonth />
      </main>
      <MembershipBanner />
    </>
  );
};

export default Home;
