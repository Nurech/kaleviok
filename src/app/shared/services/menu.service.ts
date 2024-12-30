import { computed, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentType } from '@angular/cdk/overlay';
import { navigateTo } from '../../store/router/router.actions';
import { SheetService } from './sheet.service';
import { LoginComponent } from '../../core/components/login/login.component';
import { MiniProfileComponent } from '../../core/components/profile/mini-profile/mini-profile.component';
import { isAuthenticated } from '../../store/auth/auth.selectors';

export interface MenuItem<T> {
  label?: string;
  icon?: string;
  logo?: string;
  href?: string;
  show: boolean;
  component?: ComponentType<T>;
  onClick?: () => void;
  position?: 'start' | 'end';
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private store$ = inject(Store);
  private sheetService = inject(SheetService);

  isAuthenticated = signal(false);

  constructor() {
    this.store$.select(isAuthenticated).subscribe((auth) => this.isAuthenticated.set(auth));
  }

  rootMenuItems = computed<MenuItem<any>[]>(() => [
    {
      logo: 'logo.svg',
      position: 'start',
      show: this.isAuthenticated() ? false : true,
      href: '/',
      onClick: () => this.handleNavigation('/'),
    },
    {
      position: 'start',
      component: MiniProfileComponent,
      show: this.isAuthenticated(),
      onClick: () => this.handleNavigation('/profile'),
    },
    {
      label: 'notifications',
      icon: 'notifications',
      position: 'start',
      show: true,
      href: '/notifications',
    },
    {
      label: 'dashboard',
      icon: 'team_dashboard',
      position: 'start',
      show: true,
      href: '/dashboard',
    },
    {
      label: 'users',
      icon: 'group',
      position: 'start',
      show: true,
      href: '/users',
    },
    {
      label: 'login',
      icon: 'login',
      position: 'end',
      show: !this.isAuthenticated(),
      onClick: () => this.sheetService.open(LoginComponent),
    },
    {
      label: 'admin_panel_settings',
      icon: 'admin_panel_settings',
      position: 'end',
      show: this.isAuthenticated(),
      href: '/admin-panel-settings',
    },
    {
      label: 'contact_support',
      icon: 'contact_support',
      position: 'end',
      show: true,
      href: '/contact-support',
    },
  ]);

  private handleNavigation(path: string): void {
    this.store$.dispatch(navigateTo({ path: [path] }));
  }
}
