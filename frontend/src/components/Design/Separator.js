import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";;

const Separator = () => {
  const separatorRef = useRef(null); // 🎯 Référence pour cibler l'élément

  useEffect(() => {
    // ✅ Animation initiale d'apparition
    gsap.fromTo(
      separatorRef.current,
      { width: "0%", opacity: 0.9 }, // 🎬 Départ : Ligne réduite à 0% et quasi invisible
      {
        width: "20%", // 🏁 Atteint 20% de largeur max
        opacity: 1, // 💡 Devient totalement visible
        duration: 2, // ⏳ Durée de 2 secondes
        ease: "power2.out", // ⚡ Effet fluide
      }
    );

    // ✅ Animation de respiration des extrémités
    gsap.to(separatorRef.current, {
      width: "17%", // 🔄 Réduit légèrement à 17% pour créer un **repli léger**
      duration: 2.5, // ⏳ Prend 2.5 secondes pour se replier
      repeat: -1, // 🔁 Se répète à l'infini
      yoyo: true, // ↔️ Fait un **va-et-vient**
      ease: "power2.inOut", // ⚡ Transition douce et naturelle
    });
  }, []);

  return <div className="separator" ref={separatorRef}></div>;
};

export default Separator;
