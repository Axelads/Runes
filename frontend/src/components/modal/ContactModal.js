import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import emailjs from "emailjs-com";
import { FaDiscord, FaInstagram, FaFacebook, FaForumbee } from "react-icons/fa6";

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Désactive le scroll quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloque le scroll
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(modalRef.current, { opacity: 1, scale: 1, duration: 0.3 });
    } else {
      document.body.style.overflow = "auto"; // Rétablit le scroll
    }
  }, [isOpen]);

  // ✅ Réinitialisation du formulaire quand la modale se ferme
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "", message: "" });
    }
  }, [isOpen]);

  // ✅ Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Envoi du mail avec Email.js
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.message.length < 50) {
      alert("❌ Votre message doit contenir au moins 50 caractères.");
      return;
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(() => {
        alert("📨 Votre message a été envoyé !");
        setFormData({ name: "", email: "", message: "" }); // Reset du formulaire
        onClose(); // Ferme la modale après envoi
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert("❌ Une erreur est survenue, essayez encore !");
      });
  };

  // ✅ Vérification avant d'afficher la modale
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={onClose}>
      <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Nous Contacter</h2>
        <p>📧 Par mail : <strong>assorune@gmail.com</strong></p>
        <p>📌 Retrouvez-nous aussi sur :</p>

        {/* ✅ Liste des réseaux sociaux avec icônes et accessibilité */}
        <ul className="social-links">
          <li>
            <a href="https://discord.gg/BVpRCCFSkX" target="_blank" rel="noopener noreferrer" aria-label="Rejoindre notre Discord">
              <FaDiscord /> Discord
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jeux_de_rune/" target="_blank" rel="noopener noreferrer" aria-label="Voir notre Instagram">
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=61564211517638" target="_blank" rel="noopener noreferrer" aria-label="Voir notre Facebook">
              <FaFacebook /> Facebook
            </a>
          </li>
          <li>
            <a href="https://rolistesunis.forumactif.org/" target="_blank" rel="noopener noreferrer" aria-label="Rejoindre notre Forum">
              <FaForumbee /> Forum
            </a>
          </li>
        </ul>

        <p>Ou contactez-nous directement ici :</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Votre message (minimum 50 caractères)" value={formData.message} onChange={handleChange} required />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
