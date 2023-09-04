import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// if ('Notification' in window) {
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       messaging
//         .getToken()
//         .then((token) => {
//           console.log('FCM token:', token);

//         })
//         .catch((error) => {
//           console.error('Error getting FCM token:.......................', error);
//         });
//     } else {
//       console.log('Notification permission denied.');
//     }
//   });
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
