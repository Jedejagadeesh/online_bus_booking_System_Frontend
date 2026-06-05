import axios from "axios";

// ================= BASE API =================
const api = axios.create({
  baseURL: "https://online-bus-booking-system-backend-2m8m.onrender.com/api",
});

// ================= DEBUG =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

// ================= BUSES =================
export const searchBuses = (from, to, date) =>
  api.get(`/search/?from=${from}&to=${to}&date=${date || ""}`);

export const getBookedSeats = (busId, date) =>
  api.get(`/booked/${busId}/?date=${date || ""}`);

// ================= BOOKING =================
export const bookSeats = (data) =>
  api.post(`/book/`, data);

// ================= AUTH =================
export const loginUser = (data) =>
  api.post(`/login/`, data);

export const signupUser = (data) =>
  api.post(`/register/`, data);

// ================= OTP / PASSWORD =================
export const forgotPassword = (email) =>
  api.post(`/forgot-password/`, { email });

export const verifyOtpApi = (data) =>
  api.post(`/verify-otp/`, data);

export const resetPasswordApi = (data) =>
  api.post(`/reset-password/`, data);