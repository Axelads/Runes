import React from "react";
import eventsIcon from "../../assets/image_piece/piece_verte.webp"

const Agenda = () => {
  return (
    <section className="agenda-container">
        <div className="Titre-agenda">
            <h2>Agenda des parties & Évènements</h2>
            <img src={eventsIcon} alt="Événements" className="piece" />
        </div>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=assorune%40gmail.com&ctz=Europe/Paris"
        style={{ border: "none", width: "100%", height: "500px" }}
        title="Agenda de l'association RUNE"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </section>
  );
};

export default Agenda;
