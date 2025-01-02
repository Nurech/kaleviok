importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  projectId: '$FIREBASE_PROJECT_ID',
  appId: '$FIREBASE_APP_ID',
  storageBucket: '$FIREBASE_STORAGE_BUCKET',
  apiKey: '$FIREBASE_API_KEY',
  authDomain: '$FIREBASE_AUTH_DOMAIN',
  messagingSenderId: '$FIREBASE_MESSAGING_SENDER_ID',
  measurementId: '$FIREBASE_MEASUREMENT_ID',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification?.body || 'Default Body',
    icon: payload.notification?.icon || '/assets/default-icon.png',
    data: {
      url: payload.data?.click_action || 'https://default-link.com', // Default action
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification
  const url = event.notification.data.url;
  if (url) {
    event.waitUntil(clients.openWindow(url)); // Navigate to the URL
  }
});
