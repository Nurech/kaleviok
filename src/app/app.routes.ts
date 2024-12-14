import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const libRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: () => {
      const translate = inject(TranslateService);
      return translate.instant('login');
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'drag-drop',
    loadComponent: () =>
      import('./shared/components/drag-drop/drag-drop.component').then(
        (c) => c.DragDropComponent
      ),
    title: 'Drag-Drop',
  },
];

export const routes: Routes = libRoutes;
