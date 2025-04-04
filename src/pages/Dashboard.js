import React from "react";
import { useAuth } from "../context/AuthContext"; // Ensure AuthContext is correctly set up
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleHelpRequest = async () => {
    if (!user) {
      alert("You must be logged in to request help.");
      return;
    }

    try {
      await addDoc(collection(db, "emergency_requests"), {
        userId: user.uid,
        name: user.displayName || "Anonymous", // Get user's name if available
        email: user.email,
        location: "Fetching...", // Later, replace this with live GPS location
        details: "Medical Emergency!",
        status: "pending",
        timestamp: serverTimestamp(),
      });

      alert("🚨 Emergency request sent! An ambulance is on the way.");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("❌ Failed to send request. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.displayName || user?.email}</h1>
        <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>
          Logout
        </button>
      </header>
      <main className="dashboard-main">
        <div className="emergency-card">
          <h2>Emergency Assistance</h2>
          <p>If you are experiencing a medical emergency, press the button below to request immediate help.</p>
          <button className="help-btn" onClick={handleHelpRequest}>
            🚑 HELP
          </button>
        </div>
        <div className="info-card">
          <h3>Safety Tips</h3>
          <ul>
            <li>Stay calm and breathe deeply.</li>
            <li>Clearly describe your location.</li>
            <li>Provide essential details of your condition.</li>
          </ul>
        </div>
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2025 Nearest Nurse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
