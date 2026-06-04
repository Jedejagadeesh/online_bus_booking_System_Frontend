import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // LOAD USER
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
  const res = await loginUser({ email, password });

  const userData = res.data?.user || res.data;

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));

  return res.data;
};

  // REGISTER
  const register = async (name, email, password) => {
    return await signupUser({ name, email, password });
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isAuthenticated,

        showLogin,
        showSignup,
        showForgotPassword,

        setShowLogin,
        setShowSignup,
        setShowForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}