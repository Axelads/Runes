import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap"; // ✅ Import Bootstrap

const CardEvent = ({ title, events }) => {
  const [openIndex, setOpenIndex] = useState(null); // ✅ Gère quel événement est ouvert

  // ✅ Fonction pour formater la date en français
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", // ✅ Jour en lettres (ex: lundi)
      day: "numeric", // ✅ Jour du mois (ex: 15)
      month: "long", // ✅ Mois en lettres (ex: février)
      year: "numeric", // ✅ Année (ex: 2025)
      hour: "2-digit", // ✅ Heure en 2 chiffres
      minute: "2-digit", // ✅ Minutes en 2 chiffres
    }).format(date);
  };

  // ✅ Fonction pour nettoyer les balises HTML de la description
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <Card className="card-event">
      <Card.Body>
      <h2 className="event-title">{title}</h2>

        {/* ✅ Liste des événements regroupés */}
        <ul className="event-list">
          {events.map((event, index) => {
            const eventTitle = event.summary || "Événement";
            const eventDate = event.start.dateTime || event.start.date;
            const hasDescription = event.description && event.description.trim() !== "";

            return (
              <li key={index} className="event-item">
                <div className="event-header">
                  <strong>{`${eventTitle} - ${formatDate(eventDate)}`}</strong>
                </div>

                {/* ✅ Collapse pour afficher la description uniquement si elle existe */}
                {hasDescription && (
                  <>
                    <Collapse in={openIndex === index}>
                      <div className="event-description">
                        {stripHtmlTags(event.description)} {/* ✅ Supprime les balises HTML */}
                      </div>
                    </Collapse>

                    {/* ✅ Bouton Voir plus / Réduire */}
                    <Button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      aria-controls="event-description"
                      aria-expanded={openIndex === index}
                      className="event-button"
                    >
                      {openIndex === index ? "Réduire" : "Voir plus"}
                    </Button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default CardEvent;
