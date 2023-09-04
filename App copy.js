import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

//import { getMessaging } from "firebase/messaging/sw";
//import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/messaging';

const config = {
  apiKey: "AIzaSyBEDeDQ-2jrEHSrzNBsX1k5-WaGN4KD_qk",
  authDomain: "push-notification-f969d.firebaseapp.com",
  projectId: "push-notification-f969d",
  storageBucket: "push-notification-f969d.appspot.com",
  messagingSenderId: "129212646999",
  appId: "1:129212646999:web:fb5d88bfec92b2b63c4512",
  measurementId: "G-KL9PQBNH2L"
};

function Firebase() {
  const [auth, setAuth] = useState(null);
  const [messaging, setMessaging] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    //setAuth(firebase.auth());
    const messagingInstance = firebase.messaging(); // Initialize the messaging instance

    // Check if the service worker is registered
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length) {
        setRegistration(registrations[0]);
      } else {
        navigator.serviceWorker
          .register("/firebase-message-sw.js")
          .then((registration) => {
            setRegistration(registration);
          });
      }
    });

    // Now set the messaging instance
    setMessaging(messagingInstance);


    // const messaging = getMessaging();
    // onMessage(messaging, (payload) => {
    //   console.log('Message received. ', payload);
    //   // ...
    // });

    
  }, []);

  async function askNotificationPermission() {
    try {
      const token = await messaging.getToken({
        serviceWorkerRegistration: registration,
      });
      setFcmToken(token);
      return token;
    } catch (error) {
      console.error("[FIREBASE ERROR]: ", error);
      return null;
    }
  }

  return (
    <div>
      <button onClick={askNotificationPermission}>
        Request Notification Permission
      </button>
      {fcmToken && (
        <p>FCM Token: {fcmToken}</p>
      )}


    </div>
  );
}

export default Firebase;
