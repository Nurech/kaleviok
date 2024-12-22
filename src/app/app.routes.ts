import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function translateKey(key: string, params?: object) {
  const translate = inject(TranslateService);
  return translate.get(key, params);
}

const libRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    title: () => translateKey('login'),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    title: () => translateKey('login'),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./core/components/notifications/notifications.component').then(
        (c) => c.NotificationsComponent,
      ),
    title: () => translateKey('notifications'),
  },
];

export const routes: Routes = libRoutes;
