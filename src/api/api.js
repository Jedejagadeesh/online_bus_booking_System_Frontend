import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

// BUSES
export const searchBuses = (from, to, date) =>
  api.get(`/search/?from=${from}&to=${to}&date=${date}`);

export const getBookedSeats = (busId, date) =>
  api.get(`/booked/${busId}/?date=${date}`);

// BOOKING
export const bookSeats = (data) =>
  api.post(`/book/`, data);

// AUTH
export const loginUser = (data) =>
  api.post(`/login/`, data);

export const signupUser = (data) =>
  api.post(`/register/`, data);

// OTP
export const forgotPassword = (email) =>
  api.post(`/forgot-password/`, { email });

export const verifyOtpApi = (data) =>
  api.post(`/verify-otp/`, data);

export const resetPasswordApi = (data) =>
  api.post(`/reset-password/`, data);

export default api;