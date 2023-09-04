import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage } from "firebase/messaging";


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
  //const [messaging, setMessaging] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  const app = initializeApp(config);
  const messaging = getMessaging(app);
  const vapidKey = "BMGv2WvvXPnpjmoXEqwTdGNMoLmFp8NKf_t6rybl8iT9JC7--5NNcmB685a3hkFfyofzwYzW01hM9PeKu-oe4dY";
 

  useEffect(()=>{
    (async () => {
      await askNotificationPermission();
    })();
   
    onMessage(messaging, (payload) => {

      console.log('Message received. ', payload);
      // ...
    });

    // return () => {
    //   // this now gets called when the component unmounts
    // };
  })
  
  

  async function askNotificationPermission() {
    getToken(messaging, { vapidKey: vapidKey}).then((currentToken) => {
      if (currentToken) {
        setFcmToken(currentToken);
      } else {
        setFcmToken("");
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    
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
