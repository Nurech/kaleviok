import {Routes} from '@angular/router';

// use this routes when using <app-lib-usage> component
const libRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./lib-usage/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Dashboard',
  },
  {
    path: 'address',
    loadComponent: () =>
      import('./lib-usage/address-form/address-form.component').then(
        (c) => c.AddressFormComponent
      ),
    title: 'Address',
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./lib-usage/table/table.component').then((c) => c.TableComponent),
    title: 'Table',
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./lib-usage/tree/tree.component').then((c) => c.TreeComponent),
    title: 'Tree',
  },
  {
    path: 'drag-drop',
    loadComponent: () =>
      import('./lib-usage/drag-drop/drag-drop.component').then(
        (c) => c.DragDropComponent
      ),
    title: 'Drag-Drop',
  },
];

// this routes are only for themes.angular-material.dev site
const appRoutes: Routes = []

export const routes: Routes = appRoutes;
