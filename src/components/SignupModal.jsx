import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthProvider";


export default function SignupModal() {
  const { setShowSignup, setShowLogin, showSignup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reset when modal opens
  useEffect(() => {
    if (!showSignup) return;
    setName("");
    setEmail("");
    setPassword("");
    setLoading(false);
    setError("");
    setSuccess("");
  }, [showSignup]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSignup(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setShowSignup]);

  // ================= REGISTER =================
  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/register/", {
        name,
        email,
        password,
      });

      console.log("SUCCESS:", res.data);
      setSuccess("Registered successfully ✅");
      setShowSignup(false);
    } catch (err) {
      console.log("ERROR RESPONSE:", err.response?.data);
      const data = err?.response?.data;
      const msg =
        (typeof data === "string" && data) ||
        data?.error ||
        data?.message ||
        data?.detail ||
        "Please enter valid registration details";
      setError(typeof msg === "string" ? msg : "Please enter valid registration details ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setShowSignup(false);
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-label="Register">
        <h2>Register</h2>

        <p
          style={{ cursor: "pointer", color: "black", textAlign: "right", fontSize: "30px" }}
          onClick={() => setShowSignup(false)}
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "20px", fontSize: "15px", fontWeight: "bold" }}
          disabled={loading}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "20px", fontSize: "15px", fontWeight: "bold" }}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "20px", fontSize: "15px", fontWeight: "bold" }}
          disabled={loading}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}