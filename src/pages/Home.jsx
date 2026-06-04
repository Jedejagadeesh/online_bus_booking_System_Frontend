import React, { useState } from "react";
import { searchBuses as searchBusesApi } from "../api/api";
import BusCard from "../components/BusCard";
import "../styles/style.css";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [journeyDate, setJourneyDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBuses = async () => {
    setLoading(true);

    try {
      const res = await searchBusesApi(from, to, journeyDate);
      setBuses(res.data.routes || []);
    } catch (err) {
      console.log(err);
      setBuses([]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="navbar">🚌 Bus Booking App</div>

      <div className="search-box">
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="date"
          className="date-input"
          min={new Date().toISOString().split("T")[0]}
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
        />

        <button onClick={searchBuses}>
          Search Buses
        </button>
      </div>

      <div className="results">
        {loading && <p>Loading buses...</p>}

        <div className="bus-list">
          {buses.map((bus, i) => (
            <BusCard
              key={i}
              bus={bus}
              onSelect={() => {}}
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>📞 7093885812</p>
        <p>📧 jagadeshjade490@gmail.com</p>
      </footer>
    </div>
  );
}