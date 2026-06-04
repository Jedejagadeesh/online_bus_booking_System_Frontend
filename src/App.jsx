import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { searchBuses } from "./api/api";
import BusCard from "./components/BusCard";
import SeatLayout from "./components/SeatLayout";
import Payment from "./components/Payment";
import Ticket from "./components/Ticket";

import MyBookings from "./pages/Booking";
import Track from "./pages/Track";

import LoginPopup from "./components/LoginPopup";
import SignupModal from "./components/SignupModal";

import { useAuth } from "./context/AuthProvider";
import ForgotPassword from "./components/ForgotPassword";
import "./styles/style.css";

export default function App() {
  const {
    showLogin,
    showSignup,
    isAuthenticated,
    setShowLogin,
    showForgotPassword,
    setShowSignup
  } = useAuth();

  // ================= NAVIGATION =================
  const [page, setPage] = useState("home");

  // ================= SEARCH =================
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [buses, setBuses] = useState([]);

  // ================= FLOW =================
  const [selectedBus, setSelectedBus] = useState(null);
  const [step, setStep] = useState("search");
  const [ticket, setTicket] = useState(null);

  // ================= SEARCH FUNCTION =================
  const handleSearch = async () => {
  if (!isAuthenticated()) {
    alert("Please login first to search buses");
    setShowLogin(true);
    return;
  }

  if (!from || !to) {
    alert("Enter From & To");
    return;
  }

  try {
    const res = await searchBuses(from, to, date);

    console.log("API Response:", res.data);

    setBuses(res.data);

    setStep("search");
  } catch (err) {
    console.error(err);
    alert("Error fetching buses");
  }
};
  // ================= LOGIN CLOSE RESET =================
  const closeLogin = () => {
    setShowLogin(false);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  return (
  <div className="app">

  {/* ================= NAVBAR ================= */}
  <Navbar onNavigate={setPage} />

  {/* ================= HOME ================= */}
  {page === "home" && (
    <div className="home-container">

      {/* HERO TITLE */}
      <div className="hero">
        <h1>🚌 Bus Booking System</h1>
        <p>Fast • Safe • Reliable Travel Booking</p>
      </div>

      {/* SEARCH BOX */}
      <div className="searchBox">

        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <div className="arrow">➜</div>

        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search Buses
        </button>

      </div>

      {/* BUS LIST */}
      {step === "search" && (
        <div className="busContainer">

          {buses.length === 0 ? (
            <div className="empty-state">
              🚍 No buses available. Try another route or time.
            </div>
          ) : (
            buses.map((bus, i) => (
              <BusCard
                key={i}
                bus={bus}
                onSelect={(b) => {
                  if (!isAuthenticated()) {
                    alert("Please login first");
                    setShowLogin(true);
                    return;
                  }

                  setSelectedBus(b);
                  setStep("seat");
                }}
              />
            ))
          )}

        </div>
      )}

      {/* FLOW */}
      {step === "seat" && (
        <SeatLayout
          bus={selectedBus}
          date={date}
          onNext={() => setStep("payment")}
        />
      )}

      {step === "payment" && (
        <Payment
          bus={selectedBus}
          date={date}
          onSuccess={(ticketData) => {
            setTicket(ticketData);
            setStep("ticket");
          }}
        />
      )}

      {step === "ticket" && <Ticket data={ticket} />}

    </div>
  )}

  {/* OTHER PAGES */}
  {page === "bookings" && <MyBookings />}
  {page === "track" && <Track />}

  {/* AUTH */}
  {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
  {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
  {showForgotPassword && <ForgotPassword />}

  {/* FOOTER */}
  <Footer />

</div>
  );
}