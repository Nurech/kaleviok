import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {navigateTo} from '../../store/core/core.actions';

export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly rootMenuItems: MenuItem[] = [
    {
      label: 'login',
      icon: 'login',
      onClick: () => this.handleNavigation('/login'),
    },
    {
      label: 'users',
      icon: 'group',
      onClick: () => this.handleNavigation('/users'),
    },
    {
      label: 'admin_panel_settings',
      icon: 'admin_panel_settings',
      onClick: () => this.handleNavigation('/admin-panel-settings'),
    },
    {
      label: 'contact_support',
      icon: 'contact_support',
      onClick: () => this.handleNavigation('/contact-support'),
    },
  ];

  private store = inject(Store);

  private handleNavigation(path: string): void {
    this.store.dispatch(navigateTo({ path }));
  }
}
