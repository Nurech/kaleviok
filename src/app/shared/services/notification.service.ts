import { Injectable, inject } from '@angular/core';
import { isSupported, getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messaging = inject(Messaging);
  private swPush = inject(SwPush);

  async initializeService() {
    try {
      const supported = await isSupported();
      if (!supported) {
        console.warn('Firebase Messaging is not supported in this browser.');
        return;
      }

      await this.initializeFirebaseMessaging();
      await this.requestPermission();
      this.listenToMessages();
    } catch (error) {
      console.error('Error initializing NotificationService:', error);
    }
  }

  private async initializeFirebaseMessaging() {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        console.error('Service worker registration not found.');
        return;
      }

      if (this.messaging) {
        const token = await this.getFCMToken(registration);
        console.log('FCM Token:', token);
      }
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
      if (!this.messaging) {
        console.error('Messaging is not initialized.');
        return null;
      }

      return await getToken(this.messaging, { serviceWorkerRegistration });
    } catch (error) {
      console.error('Error fetching FCM token:', error);
      return null;
    }
  }

  private listenToMessages() {
    if (!this.messaging) {
      console.warn('Messaging is not supported. Skipping message listening.');
      return;
    }

    // Foreground message handling
    onMessage(this.messaging, (payload) => {
      console.log('Foreground message received:', payload);
      const notificationTitle = payload.notification?.title || 'Default Title';
      const notificationOptions = {
        body: payload.notification?.body || 'Default Body',
        icon: '/assets/logo.svg',
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
