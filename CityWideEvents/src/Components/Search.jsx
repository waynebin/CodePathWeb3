import React, { useState, useEffect } from "react";
import { getLocations } from "../services/LocationsAPI";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const locations = await getLocations();
        const uniqueStates = [...new Set(locations.map(loc => loc.state))];
        setStates(uniqueStates.sort());
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    onSearch(query, selectedState);
  }, [query, selectedState, onSearch]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;