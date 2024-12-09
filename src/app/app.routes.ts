import {Routes} from '@angular/router';

// use this routes when using <app-lib-usage> component
const libRoutes: Routes = [
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

// this routes are only for themes.angular-material.dev site
const appRoutes: Routes = []

export const routes: Routes = appRoutes;
