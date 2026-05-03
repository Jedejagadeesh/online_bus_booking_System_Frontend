import axios from "axios";

const api = axios.create({
  baseURL: "https://online-bus-booking-system-backend-2m8m.onrender.com/api"
});

// ================= BUSES =================
export const searchBuses = (from, to) =>
  api.get(`/search/?from=${from}&to=${to}`);

export const getBookedSeats = (busId, date) =>
  api.get(`/booked/${busId}/?date=${date}`);

export const bookSeats = (data) =>
  api.post(`/book/`, data);

// ================= AUTH =================
export const loginUser = (email, password) =>
  api.post(`/login/`, { email, password });

export const signupUser = (data) =>
  api.post(`/register/`, data);

export default api;