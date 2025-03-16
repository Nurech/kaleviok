import { Routes } from '@angular/router';
import { EventComponent } from './core/components/events/event/event.component';
import { EventsComponent } from './core/components/events/events.component';
import { CreateEventComponent } from './core/components/events/create-event/create-event.component';
import { EventExistsGuard } from './shared/guards/event-exists.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./core/components/login/login.component').then((c) => c.LoginComponent),
        title: 'login'
    },
    {
        path: 'accounts',
        loadComponent: () => import('./core/components/accounts/accounts.component').then((c) => c.AccountsComponent),
        title: 'accounts'
    },
    {
        path: 'account',
        loadComponent: () => import('./core/components/accounts/account/account.component').then((c) => c.AccountComponent),
        title: 'account'
    },
    {
        path: 'register',
        loadComponent: () => import('./core/components/register/register.component').then((c) => c.RegisterComponent),
        title: 'register'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./core/components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        title: 'login'
    },
    {
        path: 'notifications',
        loadComponent: () => import('./core/components/notifications/notifications.component').then((c) => c.NotificationsComponent),
        title: 'notifications'
    },
    {
        path: 'events',
        title: 'events',
        children: [
            { path: 'upcoming', component: EventsComponent },
            { path: 'past', component: EventsComponent },
            { path: 'created', component: EventsComponent },
            { path: 'create/:id', component: CreateEventComponent },
            { path: 'edit/:id', component: CreateEventComponent },
            { path: ':id', component: EventComponent, canActivate: [EventExistsGuard] },
            { path: '', redirectTo: 'upcoming', pathMatch: 'full' }
        ]
    }
];
