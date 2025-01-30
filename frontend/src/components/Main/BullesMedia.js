import React, { useEffect } from "react";
import { gsap } from "gsap";
import discordLogo from "../../assets/logoMedia/discord_logo.svg";
import instagramLogo from "../../assets/logoMedia/instagram_logo.svg";
import facebookLogo from "../../assets/logoMedia/facebook_logo.svg";
import forumLogo from "../../assets/logoMedia/forum_logo.svg";


const BullesMedia = () => {
  useEffect(() => {
    // 🟢 Animation d'apparition des bulles (entrée en scène)
    gsap.from(".bulle", {
      x:50, 
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 1, // Décalage entre chaque bulle
    });

    // 🟢 Animation hover en GSAP
    gsap.utils.toArray(".bulle").forEach((bulle) => {
      gsap.set(bulle, { scale: 1 }); // Assure que la bulle reste stable après l'apparition

      bulle.addEventListener("mouseenter", () => {
        gsap.to(bulle, { scale: 1.2, duration: 0.3, ease: "power1.out" });
      });

      bulle.addEventListener("mouseleave", () => {
        gsap.to(bulle, { scale: 1, duration: 0.3, ease: "power1.inOut" });
      });
    });
  }, []);

  return (
    <ul className="media">
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
                <img src={facebookLogo} alt="Facebook" className="logo-medias" />
            </a>
        </li>
        <li className="bulle">
            <a href="https://rolistesunis.forumactif.org/" target="_blank" rel="noopener noreferrer">
                <img src={forumLogo} alt="Forum" className="logo-medias" />
            </a>
      </li>
    </ul>
  );
};

export default BullesMedia;
