import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import GoogleMapComponent from "../../GoogleMapComponent";

const MultiTables = ({ title, upcoming, past }) => {
  const [openPast, setOpenPast] = useState(false);
  const [openEvent, setOpenEvent] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const cleanDescription = (desc) => {
    if (!desc) return "";
    let cleaned = desc.replace(/<\/?[^>]+(>|$)/g, "");
    cleaned = cleaned.replace(/https?:\/\/www.google.com\/calendar\/event\?eid=[^\s]+/g, "");
    cleaned = cleaned.replace(/https?:\/\/cdn\.discordapp\.com\/attachments\/[^\s]+\.jpg/g, "");
    cleaned = cleaned.replace(/https?:\/\/www.google.com\/maps[^\s]+/g, "");
    return cleaned.trim();
  };

  // ✅ Fonction pour extraire lien google maps
  const extractCoordinates = (googleMapsLink) => {
    if (!googleMapsLink) return null;
  
    // 🔹 Extraction des coordonnées de l'URL Google Maps
    let match = googleMapsLink.match(/@([\d\.\-]+),([\d\.\-]+)/);
    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }
  
    console.warn("⚠️ Impossible d'extraire les coordonnées de Google Maps :", googleMapsLink);
    return null;
  };
  
  

  return (
    <Card className="card-event">
      <Card.Body>
        <h2>{title}</h2>

        <h3>À venir</h3>
        <ul className="event-list">
          {upcoming.map((event, index) => {
            // 🔹 Extraction du lien Google Maps depuis la description
            const googleMapsLink = event.description?.match(/https?:\/\/www.google.com\/maps[^\s]+/);
            const coordinates = googleMapsLink ? extractCoordinates(googleMapsLink[0]) : null;
            console.log("📍 Coordonnées extraites :", coordinates);
            

            return (
              <li key={index} className="event-item">
                <strong>{event.summary} - {formatDate(event.start.dateTime || event.start.date)}</strong>

                {/* 🔹 Affichage de Google Maps si on a pu extraire les coordonnées */}
                {coordinates && <GoogleMapComponent coordinates={coordinates} />}

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
                        {cleanDescription(event.description)}
                      </div>
                    </Collapse>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <Button
          className="event-button"
          onClick={() => setOpenPast(!openPast)}
          aria-controls="past-events-collapse"
          aria-expanded={openPast}
        >
          Déjà Passé
        </Button>

        <Collapse in={openPast}>
          <div id="past-events-collapse" className="event-list">
            {Object.keys(past).map((year) => (
              <div key={year} className="year-section">
                <h4>{year}</h4>
                <ul>
                  {past[year].map((event, index) => (
                    <li key={index} className="event-item">
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
                              {cleanDescription(event.description)}
                            </div>
                          </Collapse>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default MultiTables;
