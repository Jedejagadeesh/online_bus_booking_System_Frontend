import { useEffect, useState } from "react";
import { getBookedSeats } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Seats() {
  const { id } = useParams();
  const [booked, setBooked] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookedSeats(id).then((res) =>
      setBooked(res.data.booked_seats.map(String))
    );
  }, [id]);

  const toggleSeat = (seat) => {
    const s = String(seat);

    if (booked.includes(s)) return;

    setSelected((prev) =>
      prev.includes(s)
        ? prev.filter((x) => x !== s)
        : [...prev, s]
    );
  };

  const handleProceed = () => {
    localStorage.setItem("seats", JSON.stringify(selected));

    navigate("/payment", {
      state: {
        busId: id,
        seats: selected,
        date: new Date().toISOString().split("T")[0]
      }
    });
  };

  return (
    <div>
      <h2>Select Seats</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 60px)" }}>
        {[...Array(20)].map((_, i) => {
          const seat = String(i + 1);

          return (
            <div
              key={seat}
              onClick={() => toggleSeat(seat)}
              style={{
                margin: 5,
                padding: 10,
                background: booked.includes(seat)
                  ? "red"
                  : selected.includes(seat)
                  ? "blue"
                  : "lightgray",
                cursor: "pointer"
              }}
            >
              {seat}
            </div>
          );
        })}
      </div>

      <button onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
}