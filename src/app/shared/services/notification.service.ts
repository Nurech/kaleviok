import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messaging = inject(Messaging);

  constructor(private msg: Messaging) {
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
        getToken(this.msg, {
          serviceWorkerRegistration: serviceWorkerRegistration,
        }).then((x) => {
          console.log('FCM Token:', x);
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const token = await getToken(this.messaging, {
          vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
        });
        if (token) {
          console.log('FCM Token:', token);
          // TODO: Send the token to your server to store it and use it to send notifications.
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('An error occurred while requesting permission or getting token.', error);
    }
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      const notificationTitle = payload.notification?.title || 'Default Title';
      const notificationOptions = {
        body: payload.notification?.body || 'Default Body',
        icon: payload.notification?.icon || '/assets/default-icon.png',
      };

      // Show notification using Service Worker
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
