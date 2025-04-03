import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // Google Sign-In Function
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Logged In:", result.user);
      navigate("/dashboard"); // Redirect to Dashboard after login
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
