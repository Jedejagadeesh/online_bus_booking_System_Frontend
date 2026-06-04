import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  forgotPassword,
  verifyOtpApi,
  resetPasswordApi
} from "../api/api";

export default function ForgotPassword() {
  const { setShowForgotPassword } = useAuth();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // ================= STEP 1 =================
  const sendOtp = async () => {
  try {
    const cleanEmail = email.trim().toLowerCase();

    console.log("EMAIL SENT:", cleanEmail);

    await forgotPassword(cleanEmail);

    alert("OTP sent to your email");
    setStep(2);
  } catch (err) {
    console.log(err.response?.data);
    setError(err.response?.data?.error || "Unable to send OTP");
  }
};

  // ================= STEP 2 =================
  const verifyOtp = async () => {
  try {
    const cleanEmail = email.trim().toLowerCase();

    await verifyOtpApi({
      email: cleanEmail,
      otp: String(otp).trim()
    });

    setStep(3);
  } catch (err) {
    console.log(err.response?.data);
    setError(err.response?.data?.error || "Invalid OTP");
  }
};

  // ================= STEP 3 =================
 const resetPassword = async () => {
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const cleanEmail = email.trim().toLowerCase();

    await resetPasswordApi({
      email: cleanEmail,
      password
    });

    alert("Password Updated Successfully ✅");
    setShowForgotPassword(false);

  } catch (err) {
    console.log(err.response?.data);
    setError(err.response?.data?.error || "Password update failed");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div
          className="close-btn"
          onClick={() => setShowForgotPassword(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2>Forgot Password</h2>

            <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value.trim())}   // 👈 HERE
/>

            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2>Verify OTP</h2>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h2>Reset Password</h2>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={resetPassword}>Update Password</button>
          </>
        )}

        {error && (
          <p className="error-msg">{error}</p>
        )}

      </div>
    </div>
  );
}