import { computed, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentType } from '@angular/cdk/overlay';
import { MiniProfileComponent } from '../../core/components/profile/mini-profile/mini-profile.component';
import { isAuthenticated } from '../../store/auth/auth.selectors';

export interface MenuItem<T> {
    label?: string;
    icon?: string;
    logo?: string;
    href?: string;
    show: boolean;
    component?: ComponentType<T>;
    position?: 'start' | 'end';
}

@Injectable({ providedIn: 'root' })
export class MenuService {
    private store$ = inject(Store);
    isAuthenticated = signal(false);

    constructor() {
        this.store$.select(isAuthenticated).subscribe((auth) => this.isAuthenticated.set(auth));
    }

    rootMenuItems = computed<MenuItem<any>[]>(() => [
        {
            logo: 'logo.svg',
            position: 'start',
            show: !this.isAuthenticated(),
            href: '/'
        },
        {
            position: 'start',
            component: MiniProfileComponent,
            show: this.isAuthenticated(),
            href: '/profile'
        },
        {
            label: 'login',
            icon: 'login',
            position: 'end',
            show: !this.isAuthenticated(),
            href: '/login'
        },
        {
            label: 'dashboard',
            icon: 'team_dashboard',
            position: 'start',
            show: true,
            href: '/dashboard'
        },
        {
            label: 'accounts',
            icon: 'group',
            position: 'start',
            show: true,
            href: '/accounts'
        },
        {
            label: 'admin_panel_settings',
            icon: 'admin_panel_settings',
            position: 'end',
            show: this.isAuthenticated(),
            href: '/admin-panel-settings'
        },
        {
            label: 'contact_support',
            icon: 'contact_support',
            position: 'end',
            show: true,
            href: '/contact-support'
        }
    ]);
}
