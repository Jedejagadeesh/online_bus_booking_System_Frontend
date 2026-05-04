import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const BASE_URL = "https://online-bus-booking-system-backend-2m8m.onrender.com/api";

  // ================= LOGIN FUNCTION =================
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login/`,
        {
          email,
          password,
        }
      );

      // ✅ store only user data
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  // ================= REGISTER FUNCTION =================
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/register/`,
        {
          name,
          email,
          password,
        }
      );

      return res.data;
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  // ================= CHECK AUTH =================
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
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

// ================= CUSTOM HOOK =================
export function useAuth() {
  return useContext(AuthContext);
}