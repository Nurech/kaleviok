import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messaging = inject(Messaging);

  constructor() {
    this.listen();

    Notification.requestPermission().then((notificationPermissions: NotificationPermission) => {
      if (notificationPermissions === 'granted') {
        console.log('Granted');
      }
      if (notificationPermissions === 'denied') {
        console.log('Denied');
      }
    });
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((serviceWorkerRegistration) => {
        getToken(this.messaging, {
          serviceWorkerRegistration: serviceWorkerRegistration,
        }).then((x) => {
          console.log('FCM SW registration successful! FCM Token:', x);
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      const notificationTitle = payload.notification?.title || 'Default Title';
      const notificationOptions = {
        body: payload.notification?.body || 'Default Body',
        icon: '/logo.svg', // Replace with your app's icon
        data: {
          url: payload.data?.['click_action'] || 'https://your-default-link.com',
        },
      };

      if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.showNotification(notificationTitle, notificationOptions);
          } else {
            console.error('Service worker registration not found.');
          }
        });
      }
    });
  }
}
