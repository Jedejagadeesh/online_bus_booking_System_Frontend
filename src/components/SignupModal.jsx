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

  // ESC key close
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

      setTimeout(() => {
        setShowSignup(false);
        setShowLogin(true); // auto move to login
      }, 800);

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      const data = err?.response?.data;

      const msg =
        data?.error ||
        data?.message ||
        data?.detail ||
        "Registration failed";

      setError(msg);
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
      <div className="modal-card">

        <h2>Register</h2>

        {/* CLOSE BUTTON */}
        <p
          style={{
            cursor: "pointer",
            textAlign: "right",
            fontSize: "25px"
          }}
          onClick={() => setShowSignup(false)}
        >
          ✖
        </p>

        {/* ERROR */}
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {success}
          </div>
        )}

        {/* NAME */}
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* BUTTON */}
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
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