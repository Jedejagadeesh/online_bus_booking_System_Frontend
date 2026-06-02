import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function LoginPopup() {
  const { setShowLogin, setShowSignup, login, showLogin } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reset when modal opens
  useEffect(() => {
    if (!showLogin) return;
    setEmail("");
    setPassword("");
    setLoading(false);
    setError("");
    setSuccess("");
  }, [showLogin]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowLogin(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setShowLogin]);

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      setSuccess("Login successful ✅");
      setShowLogin(false);
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      const data = err?.response?.data;
      const msg =
        (typeof data === "string" && data) ||
        data?.error ||
        data?.message ||
        data?.detail ||
        "Please enter proper email and password";
      setError(typeof msg === "string" ? msg : "Please enter proper email and password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false);
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-label="Login">
        <h2>Login</h2>

        <p
          style={{
            cursor: "pointer",
            color: "black",
            textAlign: "right",
            fontSize: "30px",
          }}
          onClick={() => setShowLogin(false)}
          aria-label="Close"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </p>

        {error && (
          <div style={{ color: "#b00020", fontWeight: "bold", marginBottom: 10 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "#1b5e20", fontWeight: "bold", marginBottom: 10 }}>
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          New user?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}