import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDphUlStSJ0rcNX2Qk3AuxUxw6WRpykG1k",
    authDomain: "timetoken-57ad5.firebaseapp.com",
    projectId: "timetoken-57ad5",
    storageBucket: "timetoken-57ad5.firebasestorage.app",
    messagingSenderId: "492770487163",
    appId: "1:492770487163:web:4d81d5d2e3c5967d856bde",
    measurementId: "G-2YVX2R4J0P",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Only initialize analytics on client side
  let analytics = null;
  if (process.client) {
    analytics = getAnalytics(app);
  }

  return {
    provide: {
      firebase: app,
      analytics: analytics,
    },
  };
});
