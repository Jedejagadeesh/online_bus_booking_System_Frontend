import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ================= LOGIN FUNCTION =================
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",   // ✅ correct backend URL
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
        "http://127.0.0.1:8000/api/register/",
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
        register,   // ✅ added register
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