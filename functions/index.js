const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize UserApp Firestore
initializeApp();
const userDb = getFirestore();

// Initialize AmbulanceApp Firestore (Second Firebase Project)
const firebaseConfig = {
    apiKey: "AIzaSyCyhaUmOwmFqWNB6MrGiKM3w1C2K-9sNuQ",
    authDomain: "medigo-for-ambulance.firebaseapp.com",
    projectId: "medigo-for-ambulance",
    storageBucket: "medigo-for-ambulance.firebasestorage.app",
    messagingSenderId: "1087455619906",
    appId: "1:1087455619906:web:dbab3433671616efc936db",
    measurementId: "G-87FGM9LD7Y"
  };

const ambulanceApp = admin.initializeApp(ambulanceAppConfig, "ambulance");
const ambulanceDb = ambulanceApp.firestore();

// Firestore Trigger: Copy new help requests to Ambulance Firestore
exports.syncEmergencyRequests = functions.firestore
  .document("emergency_requests/{requestId}")
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();
    const requestId = context.params.requestId;

    try {
      // Add the document to the Ambulance Firestore
      await ambulanceDb.collection("emergency_requests").doc(requestId).set(requestData);
      console.log("✅ Successfully copied emergency request to AmbulanceApp");
    } catch (error) {
      console.error("❌ Error copying request:", error);
    }
  });
