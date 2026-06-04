import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/style.css";

export default function Ticket({ data }) {

  if (!data || !data.bus) return null;

  const seats = Array.isArray(data.seats)
    ? data.seats
    : String(data.seats).split(",");

  return (
    <div className="ticket-wrapper">

      <div className="ticket-card">

        {/* LEFT SIDE */}
        <div className="ticket-left">

          <h2 className="ticket-title">🎫 Booking Confirmed</h2>

          <div className="ticket-row">
            <span>Bus:</span>
            <strong>{data.bus.bus_number || data.bus.bus_name}</strong>
          </div>

          <div className="ticket-row">
            <span>From:</span>
            <strong>{data.bus.source}</strong>
          </div>

          <div className="ticket-row">
            <span>To:</span>
            <strong>{data.bus.destination}</strong>
          </div>

          <div className="ticket-row">
            <span>Seats:</span>
            <strong className="seat-badge">
              {seats.length > 1
                ? `Your seats nos are ${seats.join(", ")}`
                : `Your seat no is ${seats[0]}`}
            </strong>
          </div>

          <div className="safe-msg">
            🚍 Have a safe journey
          </div>

        </div>

        {/* RIGHT SIDE QR */}
        <div className="ticket-right">

          <QRCodeCanvas
            value={`Bus:${data.bus.bus_number}|Seats:${seats.join(",")}`}
            size={120}
          />

          <p>Scan for details</p>

        </div>

      </div>
    </div>
  );
}