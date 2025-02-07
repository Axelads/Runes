import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CardEvent from "../components/Cards/CardEvents"; 
import pieceVerte from "../assets/image_piece/piece_verte.webp";
import BackToHome from "../components/Button/BackToHome"; 
import Separator from "../components/Design/Separator"; 
import SearchBar from "../components/SearchBar";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const eventRefs = useRef({}); // ✅ Stocke les références pour le scroll
  const cardsContainerRef = useRef(null); // ✅ Référence pour l'animation GSAP

  const keywords = [
    "Multi-Tables", "Shadowrun", "Spire", "Table de campagne", "Convention",
    "Kingmaker", "Colere-des-justes", "Star-wars", "L'affaire-deluze",
    "Vampire", "Loup-garou", "L'anneau-unique", "Soleil-noir",
    "Mage-dement", "Colere-des-justes"
  ];

  const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}`
        );
        setEvents(response.data.items || []);
        setFilteredEvents(response.data.items || []);
      } catch (err) {
        setError("Erreur lors du chargement des événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Animation GSAP au chargement des cartes
  useEffect(() => {
    if (filteredEvents.length > 0) {
      gsap.fromTo(
        ".card-event",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [filteredEvents]);

  // ✅ Fonction de recherche et scroll vers le premier match
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = events.filter(event =>
        event.summary.toLowerCase().includes(lowerCaseQuery) ||
        (event.description && event.description.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredEvents(filtered);

      if (filtered.length > 0) {
        setTimeout(() => {
          const firstEvent = filtered[0].id; // ✅ Prendre le premier ID correspondant
          if (eventRefs.current[firstEvent]) {
            eventRefs.current[firstEvent].scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);
      }
    }
  }, [searchQuery, events]);

  const groupedEvents = keywords.reduce((acc, keyword) => {
    acc[keyword] = events.filter(event =>
      event.summary.toLowerCase().includes(keyword.toLowerCase())
    );
    return acc;
  }, {});

  return (
    <div>
      <BackToHome />

      {/* ✅ Barre de recherche FIXÉE en haut à droite */}
      <div className="search-bar-fixed">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Rechercher un événement..." />
      </div>

      <div className="events-container">
        {/* ✅ TITRE AVEC IMAGES ENCADRANTES */}
        <div className="event-title">
          <img src={pieceVerte} alt="Décoration gauche" className="title-icon left" />
          <h1>Événements à venir</h1>
          <img src={pieceVerte} alt="Décoration droite" className="title-icon right" />
        </div>

        {loading && <p>Chargement des événements...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="events-list" ref={cardsContainerRef}>
          {Object.entries(groupedEvents).map(([keyword, eventList], index) =>
            eventList.length > 0 ? (
              <React.Fragment key={keyword}>
                <div 
                  ref={(el) => (eventRefs.current[eventList[0].id] = el)} // ✅ Associer ref dynamique
                  className={`event-wrapper ${index % 2 === 0 ? "left" : "right"}`}
                >
                  <CardEvent title={keyword} events={eventList} />
                </div>

                {index < Object.entries(groupedEvents).length - 1 && (
                  <div className="separator-container">
                    <Separator />
                  </div>
                )}
              </React.Fragment>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
