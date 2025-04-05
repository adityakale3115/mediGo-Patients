import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userRequest, setUserRequest] = useState(null);

  // 🔁 Listen for current user's active emergency request
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "emergency_requests"),
      where("userId", "==", user.uid),
      where("status", "in", ["pending", "accepted"])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const req = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
      setUserRequest(req);
    });
    return () => unsubscribe();
  }, [user]);

  // 🚨 Send emergency request with live location
  const handleHelpRequest = async () => {
    if (!user) {
      alert("You must be logged in to request help.");
      return;
    }

    if (userRequest) {
      alert("You already have an active request. Please wait until it is resolved before sending a new one.");
      return;
    }

    // 🌍 Get user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationString = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;

        try {
          await addDoc(collection(db, "emergency_requests"), {
            userId: user.uid,
            name: user.displayName || "Anonymous",
            email: user.email,
            location: locationString,
            details: "Medical Emergency!",
            status: "pending",
            acceptedByName: null,
            acceptedByEmail: null,
            timestamp: serverTimestamp(),
          });

          alert("🚨 Emergency request sent! Await confirmation from an ambulance.");
        } catch (error) {
          console.error("Error sending request:", error);
          alert("❌ Failed to send request. Please try again.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("❌ Could not get location. Please enable location permissions.");
      }
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.displayName || user?.email}</h1>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <div className="emergency-card">
          <h2>Emergency Assistance</h2>
          <p>
            If you are experiencing a medical emergency, press the button below
            to request immediate help.
          </p>
          <button className="help-btn" onClick={handleHelpRequest}>
            🚑 HELP
          </button>
        </div>

        {/* ✅ Your Request Section */}
        {userRequest && (
          <div className="request-status-card">
            <h2>Your Request</h2>
            <p><strong>Status:</strong> {userRequest.status}</p>
            <p><strong>Location:</strong> {userRequest.location}</p>
            {userRequest.status === "accepted" && (
              <>
                <p><strong>Ambulance Driver:</strong> {userRequest.acceptedByName}</p>
                <p><strong>Driver Email:</strong> {userRequest.acceptedByEmail}</p>
              </>
            )}
          </div>
        )}

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
