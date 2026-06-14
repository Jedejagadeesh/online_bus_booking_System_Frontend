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
    onChange={(e) => setJourneyDate(e.target.value)}
  />

  <button
    className="search-btn"
    onClick={searchBuses}
  >
    🔍 Search Buses
  </button>
</div>