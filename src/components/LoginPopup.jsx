import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function LoginPopup() {

 const {
  setShowLogin,
  setShowSignup,
  setShowForgotPassword,
  login,
  showLogin
} = useAuth();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  useEffect(() => {

    if(!showLogin) return;

    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setLoading(false);

  },[showLogin]);

  useEffect(() => {

    const onKeyDown = (e) => {

      if(e.key === "Escape"){
        setShowLogin(false);
      }

    };

    window.addEventListener("keydown",onKeyDown);

    return () => {
      window.removeEventListener("keydown",onKeyDown);
    };

  },[setShowLogin]);

  const handleLogin = async () => {

    setError("");
    setSuccess("");

    if(!email || !password){

      setError("Please enter email and password");
      return;

    }

    try{

  setLoading(true);

  await login(email,password);

  setSuccess("Login successful ✅");

  alert("Login Successful ✅");

  setTimeout(() => {
    setShowLogin(false);
  },500);

}catch(err){

      console.log(err);

      const data = err?.response?.data;

      const msg =
        data?.error ||
        data?.message ||
        data?.detail ||
        "Please enter correct password";

      setError(msg);

    }finally{

      setLoading(false);

    }
  };

  return (

    <div
      className="modal-overlay"
      onClick={() => setShowLogin(false)}
    >

      <div
        className="modal-card"
        onClick={(e)=>e.stopPropagation()}
      >

        <div
          className="close-btn"
          onClick={() => setShowLogin(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <h2>Welcome Back</h2>

        {error && (
          <div className="error-msg">
            {error}
          </div>
        )}

        {success && (
          <div className="success-msg">
            {success}
          </div>
        )}

        <label>
          Email <span className="required">*</span>
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          disabled={loading}
        />

        <label>
          Password <span className="required">*</span>
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          disabled={loading}
        />

        <div
  className="forgot-link"
  onClick={()=>{
    setShowLogin(false);
    setShowForgotPassword(true);
  }}
>
  Forgot Password?
</div>

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="auth-footer">
          New user?{" "}
          <span
            onClick={()=>{
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            Register
          </span>
        </div>

      </div>

    </div>
  );
}