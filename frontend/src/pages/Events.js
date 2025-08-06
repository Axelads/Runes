import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import CardEvents from "../components/Cards/Events/CardEvents";
import PastEvents from "../components/Cards/Events/PastEvents";
import MultiTables from "../components/Cards/Events/MultiTables";
import BackToHome from "../components/Button/BackToHome";
import KeepContact from "../components/KeepContact/KeepContact";
import Agenda from "../components/Agenda/Agenda";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEventsByYear, setPastEventsByYear] = useState({});
  const [multiTableUpcoming, setMultiTableUpcoming] = useState([]);
  const [multiTablePast, setMultiTablePast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backToHomeRef = useRef(null);
  const cardsRef = useRef([]); // ✅ Référence pour l'animation GSAP

  const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Fait défiler la page tout en haut dès son ouverture
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}`
        );

        console.log("Événements bruts récupérés :", response.data.items);

        if (!response.data.items) {
          setError("Aucun événement trouvé.");
          return;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const getEventDate = (event) => new Date(event.start?.dateTime || event.start?.date);

        const sortedEvents = response.data.items
          .filter(event => event.start)
          .sort((a, b) => getEventDate(a) - getEventDate(b));

          const isMultiTables = (summary) => {
            return /multi[\s-]?tables/i.test(summary);
          };
          
          const filteredEvents = sortedEvents.filter(event => !isMultiTables(event.summary));
          const multiTableEvents = sortedEvents.filter(event => isMultiTables(event.summary));

        setUpcomingEvents(filteredEvents.filter(event => getEventDate(event) >= now));

        const groupedPastEvents = filteredEvents
          .filter(event => getEventDate(event) < now)
          .reduce((acc, event) => {
            const year = getEventDate(event).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(event);
            return acc;
          }, {});

        setPastEventsByYear(
          Object.keys(groupedPastEvents)
            .sort((a, b) => b - a)
            .reduce((obj, key) => ({ ...obj, [key]: groupedPastEvents[key] }), {})
        );

        setMultiTableUpcoming(multiTableEvents.filter(event => getEventDate(event) >= now));

        const groupedMultiTablePast = multiTableEvents
          .filter(event => getEventDate(event) < now)
          .reduce((acc, event) => {
            const year = getEventDate(event).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(event);
            return acc;
          }, {});

        setMultiTablePast(
          Object.keys(groupedMultiTablePast)
            .sort((a, b) => b - a)
            .reduce((obj, key) => ({ ...obj, [key]: groupedMultiTablePast[key] }), {})
        );

      } catch (err) {
        console.error("Erreur API Google Calendar :", err);
        setError("Erreur lors du chargement des événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      {/* ✅ Bouton de retour animé */}
      <div ref={backToHomeRef}>
        <BackToHome />
      </div>

      <h1>Événements</h1>

      {loading && <p>Chargement des événements...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Partie avec les cartes alignées */}
      <div className="events-grid">
        <div ref={(el) => (cardsRef.current[0] = el)}>
          <CardEvents title="Parties à Venir" events={upcomingEvents} />
        </div>
        <div ref={(el) => (cardsRef.current[1] = el)}>
          <MultiTables title="Multi-Tables" upcoming={multiTableUpcoming} past={multiTablePast} />
        </div>
      </div>
      {/* ✅ Carte des événements passés centrée en dessous */}
      <div className="events-past" ref={(el) => (cardsRef.current[2] = el)}>
        <PastEvents title="Événements Passés" pastEventsByYear={pastEventsByYear} />
      </div>
      <KeepContact />
      <Agenda />
    </div>
  );
};

export default Events;
