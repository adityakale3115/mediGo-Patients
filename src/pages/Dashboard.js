import React from "react";
import { useAuth } from "../context/AuthContext"; // Make sure your AuthContext is set up correctly
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleHelpRequest = () => {
    // Replace with your logic to send a help request to the nearest nurse/ambulance
    alert("Help request sent to the nearest nurse!");
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
            HELP
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
