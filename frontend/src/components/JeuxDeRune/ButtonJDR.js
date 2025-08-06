import React, { useState, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";;

const ButtonJDR = () => {
  const targetDate = new Date("2025-09-12T00:00:00"); // 📌 Date cible de l'événement (à modifier)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.to(".btn-jdr", {
      scale: 1.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="jeux-de-rune">
      <a href="https://jeuxderune.com/" target="_blank" rel="noopener noreferrer" className="btn-jdr">
        Jeux De Rune édition
      </a>
      <p>Dans :</p>
      <div className="countdown">
        <span>{timeLeft.days}j</span> : 
        <span>{timeLeft.hours}h</span> : 
        <span>{timeLeft.minutes}m</span> : 
        <span>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

export default ButtonJDR;
