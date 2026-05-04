import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthProvider";
import { useLocation } from "react-router-dom";

export default function Payment({ bus, onSuccess }) {
  const { user } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ PRIORITY: navigation state
  const seats =
    location.state?.seats ||
    JSON.parse(localStorage.getItem("seats")) ||
    [];

  const busId = location.state?.busId || bus?.id;

  const date =
    location.state?.date ||
    new Date().toISOString().split("T")[0];

  const totalPrice = seats.length * (bus?.price || 0);

  const handlePayment = async () => {
    if (!name || !email) {
      alert("Enter name & email");
      return;
    }

    if (seats.length === 0) {
      alert("No seats selected");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/book/", {
        bus: busId,
        seats: seats.join(","),
        journey_date: date,
        user_id: user?.id,
        name,
        email
      });

      const ticketData = {
        ticketNo: "TKT" + Date.now(),
        user: { name, email },
        bus,
        seats: seats.join(","),
        total: totalPrice,
        date,
        status: "Booked"
      };

      const old = JSON.parse(localStorage.getItem("bookings")) || [];
      localStorage.setItem("bookings", JSON.stringify([...old, ticketData]));

      localStorage.removeItem("seats");

      alert("Booking successful ✅");

      onSuccess(ticketData);

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Booking failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="paymentBox">

      <h2>💳 Payment</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>📅 Date: {date}</p>
      <p>💺 Seats: {seats.join(", ")}</p>
      <p>💰 Total: ₹{totalPrice}</p>

      <button onClick={handlePayment}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

    </div>
  );
}