import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function normalizeAuthResponse(data) {
  // Backend may return different shapes; handle common ones.
  // Examples:
  // 1) { user: {...}, token: "..." }
  // 2) { user: {...} }
  // 3) { token: "...", user: {...} }
  // 4) { access: "...", user: {...} }
  const user = data?.user ?? data?.payload?.user ?? data?.data?.user ?? null;
  const token =
    data?.token ?? data?.access ?? data?.accessToken ?? data?.jwt ?? null;
  return { user, token };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ BASE URL (use local backend when running on your machine)
  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://online-bus-booking-system-backend-2m8m.onrender.com/api";

  // ================= LOAD USER / TOKEN =================
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedToken && !savedUser) {
      // If backend only returns token, user might be absent.
      setUser({ email: "authenticated" });
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login/`, {
        email,
        password,
      });

      const { user: nextUser, token } = normalizeAuthResponse(res.data);

      if (nextUser) {
        setUser(nextUser);
        localStorage.setItem("user", JSON.stringify(nextUser));
      }
      if (token) {
        localStorage.setItem("token", token);
      }

      return res.data;
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  // ================= REGISTER =================
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/register/`, {
        name,
        email,
        password,
      });

      return res.data;
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    const hasUser = !!user;
    const hasToken = !!localStorage.getItem("token");
    return hasUser || hasToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        showLogin,
        showSignup,
        setShowLogin,
        setShowSignup,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

