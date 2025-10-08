import { useState, useEffect, useCallback } from "react";
import "../src/CSS/App.css";
import EventCards from "./Components/EventCards.jsx";
import Navbar from "./Components/Navbar.jsx";
import Search from "./Components/Search.jsx";
import { getAllEvents } from "./services/EventsAPI.jsx";
import { Routes, Route } from "react-router-dom";
import EventDetail from "./Components/EventDetail.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        console.log("getAllEvents ->", data);
        const arr = Array.isArray(data) ? data : [];
        // Normalize imageUrl property (some backends / DB drivers return lowercased keys like `imageurl`)
        const normalized = arr.map((e) => ({
          ...e,
          imageUrl: e.imageUrl || e.imageurl || e.image || e.img || null,
        }));
        setEvents(normalized);
        setFilteredEvents(normalized);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = useCallback(
    (query, selectedState) => {
  let filtered = events || [];

      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter((e) => {
          const title = (e.title || "").toLowerCase();
          const desc = (e.description || "").toLowerCase();
          const loc = (e.location || "").toLowerCase();
          return title.includes(q) || desc.includes(q) || loc.includes(q);
        });
      }

      if (selectedState) {
        filtered = filtered.filter((e) => (e.location || "").endsWith(`, ${selectedState}`));
      }

      setFilteredEvents(filtered);
    },
    [events]
  );

  return (
    <>
      <div className="background" />
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search onSearch={handleSearch} />
                {filteredEvents && filteredEvents.length > 0 ? (
                  <EventCards events={filteredEvents} />
                ) : (
                  <div style={{ padding: 20 }}>
                    <strong>No events to show.</strong>
                    <div>Open the DevTools console and check the network request to /api/events.</div>
                  </div>
                )}
              </>
            }
          />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;