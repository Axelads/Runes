import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";

const PastEvents = ({ title, pastEventsByYear }) => {
  const [openYear, setOpenYear] = useState(null);
  const [openEvent, setOpenEvent] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="card-event">
      <Card.Body>
        <h2>{title}</h2>

        <div className="past-events-container">
          {Object.keys(pastEventsByYear).map((year) => (
            <div key={year} className="year-collapse">
              <Button
                className="event-button"
                onClick={() => setOpenYear(openYear === year ? null : year)}
                aria-controls={`collapse-${year}`}
                aria-expanded={openYear === year}
              >
                {year}
              </Button>
              <Collapse in={openYear === year}>
                <div id={`collapse-${year}`} className="event-list">
                  {pastEventsByYear[year].map((event, index) => (
                    <div key={index} className="event-item">
                      <strong>{event.summary} - {formatDate(event.start.dateTime || event.start.date)}</strong>

                      {event.description && (
                        <>
                          <Button
                            onClick={() => setOpenEvent(openEvent === index ? null : index)}
                            aria-controls={`event-desc-${index}`}
                            aria-expanded={openEvent === index}
                          >
                            {openEvent === index ? "Réduire" : "Voir plus"}
                          </Button>

                          <Collapse in={openEvent === index}>
                            <div id={`event-desc-${index}`} className="event-description">
                              {event.description.replace(/<\/?[^>]+(>|$)/g, "")} {/* ✅ Supprime les balises HTML */}
                            </div>
                          </Collapse>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PastEvents;
