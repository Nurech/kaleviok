import { inject, Injectable } from '@angular/core';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messaging = inject(Messaging);

  constructor(private swPush: SwPush) {
    this.initializeFirebaseMessaging();
    this.requestPermission();
    this.listenToMessages();
  }

  private async initializeFirebaseMessaging() {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        console.error('Service worker registration not found.');
        return;
      }

      // Get and log the FCM token
      const token = await this.getFCMToken(registration);
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error initializing Firebase Messaging:', error);
    }
  }

  private async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.error('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }

  private async getFCMToken(serviceWorkerRegistration: ServiceWorkerRegistration): Promise<string | null> {
    try {
      return await getToken(this.messaging, {
        serviceWorkerRegistration,
      });
    } catch (error) {
      console.error('Error fetching FCM token:', error);
      return null;
    }
  }

  private listenToMessages() {
    // Foreground message handling
    onMessage(this.messaging, (payload) => {
      console.log('Foreground message received: ', payload);
      const notificationTitle = payload.notification?.title || 'Default Title';
      const notificationOptions = {
        body: payload.notification?.body || 'Default Body',
        icon: '/assets/logo.svg', // Replace with your app's icon
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

    // Background message handling through SwPush
    this.swPush.messages.subscribe((message) => {
      console.log('Background message received via SwPush:', message);
    });
  }
}
