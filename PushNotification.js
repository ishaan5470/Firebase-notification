import React, { useEffect, useState } from 'react';
import { messaging } from './firebase';

function PushNotification() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = messaging.onMessage((payload) => {
      setMessage(payload.notification.body);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Push Notification:</h2>
      <p>{message}</p>
    </div>
  );
}

export default PushNotification;
