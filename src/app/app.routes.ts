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
];

export const routes: Routes = libRoutes;
