import axios from "axios";

// ================= BASE API =================
const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || "https://online-bus-booking-system-backend-2m8m.onrender.com/api";

const api = axios.create({
  baseURL: apiBaseURL,
});

// ================= DEBUG INTERCEPTOR (IMPORTANT) =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ================= BUSES =================
export const searchBuses = (from, to, date) =>
  axios.get(
    `https://online-bus-booking-system-backend-2m8m.onrender.com/api/search/?from=${from}&to=${to}&date=${date}`
  );

export const getBookedSeats = (busId, date) =>
  api.get(`/booked/${busId}/?date=${date}`);

// ================= BOOKING =================
export const bookSeats = async (data) => {
  try {
    console.log("Booking Request Data:", data);

    const res = await api.post(`/book/`, data);

    console.log("Booking Success:", res.data);
    return res.data;

  } catch (error) {
    console.log("Booking Failed:", error.response?.data || error.message);
    throw error;
  }
};

// ================= AUTH =================
export const loginUser = (email, password) =>
  api.post(`/login/`, { email, password });

export const signupUser = (data) =>
  api.post(`/register/`, data);

export default api;