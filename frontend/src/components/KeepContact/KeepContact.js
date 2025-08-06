import React from "react";
import { FaDiscord, FaForumbee } from "react-icons/fa6";

const KeepContact = () => {
  return (
    <div className="keep-contact">
      <p>
        Pour suivre les avancées ou proposer une table, n’hésitez pas à nous rejoindre sur{" "}
        <a href="https://discord.gg/BVpRCCFSkX" target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaDiscord className="icon" /> Discord
        </a>{" "}
        ou sur notre{" "}
        <a href="https://rolistesunis.forumactif.org/" target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaForumbee className="icon" /> Forum
        </a>.
      </p>
    </div>
  );
};

export default KeepContact;
