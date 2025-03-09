import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventComponent } from './core/components/events/event/event.component';
import { EventsComponent } from './core/components/events/events.component';
import { CreateEventComponent } from './core/components/events/create-event/create-event.component';
import { EventExistsGuard } from './shared/guards/event-exists.guard';

export function translateKey(key: string, params?: object) {
    const translate = inject(TranslateService);
    return translate.get(key, params);
}

const libRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./core/components/login/login.component').then((c) => c.LoginComponent),
        title: () => translateKey('login')
    },
    {
        path: 'accounts',
        loadComponent: () => import('./core/components/accounts/accounts.component').then((c) => c.AccountsComponent),
        title: () => translateKey('accounts')
    },
    {
        path: 'account',
        loadComponent: () => import('./core/components/account/account.component').then((c) => c.AccountComponent),
        title: () => translateKey('account')
    },
    {
        path: 'register',
        loadComponent: () => import('./core/components/register/register.component').then((c) => c.RegisterComponent),
        title: () => translateKey('register')
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./core/components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        title: () => translateKey('login')
    },
    {
        path: 'notifications',
        loadComponent: () =>
            import('./core/components/notifications/notifications.component').then((c) => c.NotificationsComponent),
        title: () => translateKey('notifications')
    },
    {
        path: 'events',
        component: EventsComponent,
        title: () => translateKey('events'),
        children: [
            { path: 'upcoming', component: EventsComponent },
            { path: 'past', component: EventsComponent },
            { path: 'created', component: EventsComponent },
            { path: 'create', component: CreateEventComponent },
            { path: '', redirectTo: 'upcoming', pathMatch: 'full' }
        ]
    },
    {
        path: 'events',
        component: EventComponent,
        title: () => translateKey('event'),
        children: [
            { path: ':id', component: EventComponent, canActivate: [EventExistsGuard] },
            { path: '', redirectTo: 'events', pathMatch: 'full' }
        ]
    }
];

export const routes: Routes = libRoutes;
