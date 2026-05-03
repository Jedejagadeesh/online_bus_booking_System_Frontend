import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function LoginPopup() {
  const { setShowLogin, setShowSignup, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // RESET WHEN COMPONENT OPENS
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  // ================= LOGIN HANDLER =================
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      // ⚠️ login must be a FUNCTION from context
      await login(email, password);

      alert("Login successful ✅");
      setShowLogin(false);
    } catch (err) {
      console.log("LOGIN ERROR:", err?.response?.data || err.message);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Login</h2>

        {/* ❌ FIXED: class -> className */}
        <p
          style={{
            cursor: "pointer",
            color: "black",
            textAlign: "right",
            fontSize: "30px"
          }}
          onClick={() => setShowLogin(false)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
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

        <p
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => setShowLogin(false)}
        >
          Close
        </p>

      </div>
    </div>
  );
}