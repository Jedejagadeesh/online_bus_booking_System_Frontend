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
  if (!from.trim() || !to.trim()) {
    alert("Please enter From and To locations");
    return;
  }

  setLoading(true);

  try {
    const res = await searchBusesApi(
      from.trim(),
      to.trim(),
      journeyDate
    );

    alert(JSON.stringify(res.data)); // TEMP DEBUG

    if (Array.isArray(res.data)) {
      setBuses(res.data);
    } else if (res.data?.routes) {
      setBuses(res.data.routes);
    } else {
      setBuses([]);
    }
  } catch (err) {
    alert("API ERROR");
    console.error(err);
    setBuses([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="navbar">
        🚌 Bus Booking System
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="📍 From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="📍 To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="date"
          value={journeyDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setJourneyDate(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={searchBuses}
        >
          🔍 Search Buses
        </button>
      </div>

      <div className="results">
        {loading && <p>Loading buses...</p>}

        {!loading &&
          buses.length === 0 && (
            <p>
              🚍 No buses available. Try another
              route or time.
            </p>
          )}

        <div className="bus-list">
          {buses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              onSelect={() =>
                console.log(
                  "Selected Bus:",
                  bus
                )
              }
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        <h3>
          🚌 Bus Booking System
        </h3>
        <p>
          Fast | Safe | Reliable Travel
          Booking
        </p>

        <p>
          📞 Mobile: 7093885812
        </p>

        <p>
          📧 Email:
          jagadeshjade490@gmail.com
        </p>

        <p>
          Bus Booking System. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}