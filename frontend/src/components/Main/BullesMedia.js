import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import discordLogo from "../../assets/logoMedia/discord_logo.svg";
import instagramLogo from "../../assets/logoMedia/instagram_logo.svg";
import facebookLogo from "../../assets/logoMedia/facebook_logo.svg";
import forumLogo from "../../assets/logoMedia/forum_logo.svg";
import Xlogo from "../../assets/logoMedia/X_logo.svg";
import pinterestLogo from "../../assets/logoMedia/pinterest_logo.svg";

const BullesMedia = ({ isModalOpen }) => {
  const mediaRef = useRef(null);

  useEffect(() => {
    const elements = mediaRef.current.children;
    
    gsap.fromTo(
      elements,
      { opacity: 0, x: 50 },
      { opacity: isModalOpen ? 0 : 1, x: 0, duration: 1.2, ease: "power2.out", stagger: 0.5 }
    );
  }, [isModalOpen]);

  return (
    <ul className="media" ref={mediaRef}>
      <li className="bulle">
        <a href="https://discord.gg/BVpRCCFSkX" target="_blank" rel="noopener noreferrer">
          <img src={discordLogo} alt="Discord" className="logo-medias"/>
        </a>
      </li>
      <li className="bulle">
        <a href="https://www.instagram.com/jeux_de_rune/" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram" className="logo-medias"/>
        </a>
      </li>
      <li className="bulle">
        <a href="https://www.facebook.com/profile.php?id=61564211517638" target="_blank" rel="noopener noreferrer">
          <img src={facebookLogo} alt="Facebook" className="logo-medias"/>
        </a>
      </li>
      <li className="bulle">
        <a href="https://rolistesunis.forumactif.org/" target="_blank" rel="noopener noreferrer">
          <img src={forumLogo} alt="Forum" className="logo-medias"/>
        </a>
      </li>
      <li className="bulle">
        <a href="https://x.com/jeuxderune" target="_blank" rel="noopener noreferrer">
          <img src={Xlogo} alt="Twitter" className="logo-medias"/>
        </a>
      </li>
      <li className="bulle">
        <a href="https://fr.pinterest.com/assorune/" target="_blank" rel="noopener noreferrer">
          <img src={pinterestLogo} alt="Pinterest" className="logo-medias"/>
        </a>
      </li>
    </ul>
  );
};

export default BullesMedia;
