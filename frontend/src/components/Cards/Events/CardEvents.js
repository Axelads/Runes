import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";

const CardEvents = ({ title, events }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="card-event">
      <Card.Body>
        <h2>{title}</h2>
        <ul className="event-list">
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <strong>{event.summary} - {formatDate(event.start.dateTime || event.start.date)}</strong>

              {event.description && (
                <>
                  <Button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-controls={`collapse-${index}`}
                    aria-expanded={openIndex === index}
                  >
                    {openIndex === index ? "Réduire" : "Voir plus"}
                  </Button>

                  <Collapse in={openIndex === index}>
                    <div id={`collapse-${index}`}>
                      {event.description.replace(/<\/?[^>]+(>|$)/g, "")} {/* ✅ Supprime les balises HTML */}
                    </div>
                  </Collapse>
                </>
              )}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default CardEvents;
