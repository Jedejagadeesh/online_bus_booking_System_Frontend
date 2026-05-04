import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function LoginPopup() {
  const { setShowLogin, setShowSignup, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // reset when popup opens
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
      await login(email, password);

      alert("Login successful ✅");
      setShowLogin(false);
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert("Login failed ❌ Check credentials");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Login</h2>

        {/* close button */}
        <p
          style={{
            cursor: "pointer",
            color: "black",
            textAlign: "right",
            fontSize: "30px",
          }}
          onClick={() => setShowLogin(false)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin}>
          Login
        </button>

        {/* SWITCH TO SIGNUP */}
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

        {/* CLOSE */}
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