import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api"   // ✅ LOCAL BACKEND
  // For production:
  // baseURL: "https://onlinebusticketreservationsystem-production.up.railway.app/api"
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
  api.post(`/login/`, { email, password });   // ✅ FIXED

export const signupUser = (data) =>
  api.post(`/register/`, data);               // ✅ FIXED (NOT signup)

export default api;