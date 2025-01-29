import React, { useEffect } from "react";
import { gsap } from "gsap";

const Intro = () => {
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Animation du texte : apparition mot par mot
    tl.from(".animated-text span", {
      y: -50,
      opacity: 0,
      ease: "power2.out", 
      duration: 0.9,
      stagger: 0.4, // Décalage entre chaque mot
    });

    // Animation du logo : apparaît après le texte, commence petit et grandit une seule fois
    tl.fromTo(
      ".logo-animation",
      { scale: 0, opacity: 0 }, // Taille min et invisible au départ
      { scale: 1.5, opacity: 1, duration: 1.5, ease: "power2.out" } // Devient plus grand
    );

    // Stabilisation après l'animation
    tl.to(".logo-animation", {
      scale: 1, // Reprend sa taille normale après la pulsation
      duration: 0.8,
      ease: "power2.inOut",
    });

    tl.play(); // Lancer l'animation après l'ajout des éléments à la timeline

  }, []); // Correction : Bonne fermeture du `useEffect`

  return (
    <section className="intro" style={{ backgroundImage: `url(/assets/Background_main.webp)` }}>
      <div className="overlay">
        {/* Animation du texte */}
        <div className="animated-text">
          <h1>
            <div><span>Runes,</span></div>
            <div>
                <span>Rolistes</span> <span>Unis,</span> <span>sous</span> <span>un</span> <span>nouvel</span> <span>Emblème.</span>
            </div>
          </h1>
        </div>

        {/* Animation du logo */}
        <img src="/assets/logo-ecriture.webp" alt="Logo Runes" className="logo-animation" />
      </div>
    </section>
  );
};

export default Intro;
